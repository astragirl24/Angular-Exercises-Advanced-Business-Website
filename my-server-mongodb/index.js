const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:56241'],
  credentials: true
}));

const session = require('express-session');
app.use(session({
  secret: 'mysecret',
  resave: true, // Changed to true based on prompt
  saveUninitialized: true,
  cookie: {
    secure: false, // Must be false for localhost without HTTPS
    httpOnly: true, // Recommended for security
    sameSite: 'lax' // Recommended for localhost CORS
  }
}));

app.listen(port, () => {
  console.log(`My Server listening on port ${port}`)
});

app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB")
});

const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion");
userCollection = database.collection("User");
onclassDb = client.db("OnClass");
logginCollection = onclassDb.collection("Loggin");
productCollection = database.collection("Products"); // Ex 58

// Tạo sample Users trong FashionData nếu chưa có
async function initSampleUsers() {
  const sampleUsers = [
    { username: "diemhuong2425", password: "123456" },
    { username: "tranduythanh", password: "123456" },
    { username: "admin", password: "admin123" },
    { username: "student", password: "student123" },
  ];
  for (const user of sampleUsers) {
    await userCollection.updateOne(
      { username: user.username },
      { $setOnInsert: user },
      { upsert: true },
    );
  }
  console.log("Sample Users ensured in FashionData.User");
}
initSampleUsers();

// Tạo tài khoản admin mặc định nếu chưa có
async function initDefaultUser() {
  const existing = await logginCollection.findOne({ username: "diemhuong2425" });
  if (!existing) {
    await logginCollection.insertOne({
      username: "diemhuong2425",
      password: "123456",
      fullname: "Diem Huong",
      email: "dtdh2425@gmail.com",
      phone: "0123456789",
      role: "admin",
      createdAt: new Date(),
    });
    console.log("Default admin account created in Loggin collection.");
  }
}
initDefaultUser();

// GET all fashions
app.get("/fashions", cors(), async (req, res) => {
  try {
    const result = await fashionCollection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one fashion by id
app.get("/fashions/:id", cors(), async (req, res) => {
  try {
    const result = await fashionCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new fashion
app.post("/fashions", cors(), async (req, res) => {
  try {
    const { style, fashion_subject, fashion_detail, fashion_image } = req.body;
    const newFashion = {
      style,
      fashion_subject,
      fashion_detail,
      fashion_image,
    };
    const result = await fashionCollection.insertOne(newFashion);
    res
      .status(201)
      .json({ message: "Created successfully", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update fashion by id
app.put("/fashions/:id", cors(), async (req, res) => {
  try {
    const { style, fashion_subject, fashion_detail, fashion_image } = req.body;
    const result = await fashionCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { style, fashion_subject, fashion_detail, fashion_image } },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE fashion by id
app.delete("/fashions/:id", cors(), async (req, res) => {
  try {
    const result = await fashionCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /auth/login - Đăng nhập, lưu Cookie
app.post(
  "/auth/login",
  cors({ origin: 'http://localhost:4200', credentials: true }),
  async (req, res) => {
    try {
      if (!req.body)
        return res.status(400).json({ success: false, message: "Body rỗng" });
      const { username, password } = req.body;
      if (!username || !password)
        return res
          .status(400)
          .json({ success: false, message: "Thiếu username hoặc password" });
      const user = await userCollection.findOne({ username, password });
      if (user) {
        // Lưu thông tin đăng nhập vào Cookie (maxAge: 7 ngày)
        res.cookie("username", username, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: false,
        });
        res.cookie("password", password, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: false,
        });
        res.json({
          success: true,
          message: "Đăng nhập thành công",
          username: user.username,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Tài khoản hoặc mật khẩu không đúng",
        });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// GET /auth/users - Lấy danh sách user trong FashionData.User
app.get("/auth/users", cors(), async (req, res) => {
  try {
    const result = await userCollection
      .find({}, { projection: { password: 0 } })
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /auth/register - Đăng ký user mới vào FashionData.User
app.post("/auth/register", cors(), async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Thiếu username hoặc password" });
    const existing = await userCollection.findOne({ username });
    if (existing) return res.status(409).json({ error: "Username đã tồn tại" });
    const result = await userCollection.insertOne({ username, password });
    res
      .status(201)
      .json({ message: "Đăng ký thành công", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /login - Đăng nhập
app.post("/login", cors(), async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ success: false, message: "Body rỗng" });
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Thiếu username hoặc password" });
    const user = await logginCollection.findOne({ username, password });
    if (user) {
      res.json({
        success: true,
        message: "Đăng nhập thành công",
        role: user.role,
        fullname: user.fullname,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /register - Đăng ký tài khoản mới
app.post("/register", cors(), async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ error: "Body rỗng" });
    const { username, password, fullname, email, phone, role } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Thiếu username hoặc password" });
    const existing = await logginCollection.findOne({ username });
    if (existing) return res.status(409).json({ error: "Username đã tồn tại" });
    const result = await logginCollection.insertOne({
      username,
      password,
      fullname: fullname || "",
      email: email || "",
      phone: phone || "",
      role: role || "user",
      createdAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Đăng ký thành công", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /loggin - Lấy danh sách tất cả user (ẩn password)
app.get("/loggin", cors(), async (req, res) => {
  try {
    const result = await logginCollection
      .find({}, { projection: { password: 0 } })
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /loggin/:username - Lấy thông tin 1 user
app.get("/loggin/:username", cors(), async (req, res) => {
  try {
    const user = await logginCollection.findOne(
      { username: req.params.username },
      { projection: { password: 0 } },
    );
    if (!user) return res.status(404).json({ error: "User không tồn tại" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /loggin/:username - Cập nhật thông tin user
app.put("/loggin/:username", cors(), async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ error: "Body rỗng" });
    const { password, fullname, email, phone, role } = req.body;
    const updateFields = {};
    if (password) updateFields.password = password;
    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (role) updateFields.role = role;
    const result = await logginCollection.updateOne(
      { username: req.params.username },
      { $set: updateFields },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "User không tồn tại" });
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /loggin/:username - Xóa user
app.delete("/loggin/:username", cors(), async (req, res) => {
  try {
    const result = await logginCollection.deleteOne({
      username: req.params.username,
    });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "User không tồn tại" });
    res.json({ message: "Xóa user thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Thêm cookie-parser để xử lý cookie
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/create-cookie", cors({ origin: 'http://localhost:4200', credentials: true }), (req, res) => {
  res.cookie("username", "tranduythanh");
  res.cookie("password", "123456");
  account = { username: "tranduythanh", password: "123456" };
  res.cookie("account", account);
  res.send("cookies are created");
});
app.get("/read-cookie", cors({ origin: 'http://localhost:4200', credentials: true }), (req, res) => {
  //cookie is stored in client, so we use req
  username = req.cookies.username;
  password = req.cookies.password;
  account = req.cookies.account;
  infor = "username = " + username + "<br/>";
  infor += "password = " + password + "<br/>";
  if (account != null) {
    infor += "account.username = " + account.username + "<br/>";
    infor += "account.password = " + account.password + "<br/>";
  }
  res.send(infor);
});
app.get("/create-limited-cookie", cors({ origin: 'http://localhost:4200', credentials: true }), (req, res) => {
  //Expires after 360000 ms from the time it is set.
  res.cookie("infor_limit1", "I am limited Cookie - way 1", {
    expires: new Date(Date.now() + 360000),
  });
  res.cookie("infor_limit2", "I am limited Cookie - way 2", { maxAge: 360000 });
  res.send("Limited cookies are created");
});
app.get("/clear-cookie", cors({ origin: 'http://localhost:4200', credentials: true }), (req, res) => {
  res.clearCookie("account");
  res.send("[account] Cookie is removed");
});

// ============================================================
// MOMO PAYMENT INTEGRATION (Sandbox - Test Environment)
// Sinh vien: Do Thị Diem Huong - K234111390
// Endpoint: https://test-payment.momo.vn/v2/gateway/api/create
// ============================================================
const crypto = require("crypto");
const https = require("https");

const MOMO_CONFIG = {
  partnerCode: "MOMO",
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  hostname: "test-payment.momo.vn",
  path: "/v2/gateway/api/create",
  requestType: "payWithMethod",
  redirectUrl: "http://localhost:4200/momo-result",
  ipnUrl: "http://localhost:3002/momo/ipn",
};

// Tạo chữ ký HMAC SHA256
function createMomoSignature(rawSignature) {
  return crypto
    .createHmac("sha256", MOMO_CONFIG.secretKey)
    .update(rawSignature)
    .digest("hex");
}

// POST /momo/create-payment — Tạo yêu cầu thanh toán MoMo
app.post("/momo/create-payment", cors(), async (req, res) => {
  try {
    const { amount, orderInfo, orderId } = req.body;
    if (!amount || !orderInfo || !orderId) {
      return res
        .status(400)
        .json({ error: "Thiếu amount, orderInfo hoặc orderId" });
    }

    const requestId = MOMO_CONFIG.partnerCode + new Date().getTime();
    const extraData = "";

    // Tạo rawSignature ĐÚNG THỨ TỰ alphabetical
    const rawSignature =
      "accessKey=" +
      MOMO_CONFIG.accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      MOMO_CONFIG.ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      MOMO_CONFIG.partnerCode +
      "&redirectUrl=" +
      MOMO_CONFIG.redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      MOMO_CONFIG.requestType;

    const signature = createMomoSignature(rawSignature);

    const requestBody = JSON.stringify({
      partnerCode: MOMO_CONFIG.partnerCode,
      partnerName: "MoMo Payment Test",
      storeId: "MomoTestStore",
      accessKey: MOMO_CONFIG.accessKey,
      requestId: requestId,
      amount: String(amount),
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: MOMO_CONFIG.redirectUrl,
      ipnUrl: MOMO_CONFIG.ipnUrl,
      extraData: extraData,
      requestType: MOMO_CONFIG.requestType,
      autoCapture: true,
      orderGroupId: "",
      signature: signature,
      lang: "vi",
    });

    console.log("[MoMo] rawSignature:", rawSignature);
    console.log("[MoMo] signature:", signature);
    console.log("[MoMo] requestBody:", requestBody);

    const options = {
      hostname: MOMO_CONFIG.hostname,
      port: 443,
      path: MOMO_CONFIG.path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };

    const momoReq = https.request(options, (momoRes) => {
      let data = "";
      momoRes.setEncoding("utf8");
      momoRes.on("data", (chunk) => {
        data += chunk;
      });
      momoRes.on("end", () => {
        console.log("[MoMo] Response:", data);
        const parsed = JSON.parse(data);
        res.json({
          resultCode: parsed.resultCode,
          message: parsed.message,
          payUrl: parsed.payUrl,
          orderId: parsed.orderId,
          requestId: parsed.requestId,
        });
      });
    });

    momoReq.on("error", (e) => {
      console.error("[MoMo] Request error:", e.message);
      res.status(500).json({ error: e.message });
    });

    momoReq.write(requestBody);
    momoReq.end();
  } catch (err) {
    console.error("[MoMo] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /momo/ipn — Nhận callback server-to-server từ MoMo (IPN)
app.post("/momo/ipn", cors(), (req, res) => {
  console.log("[MoMo IPN] Received callback:", req.body);
  const { orderId, resultCode, amount, message, signature } = req.body;
  console.log(
    `[MoMo IPN] orderId: ${orderId} | resultCode: ${resultCode} | amount: ${amount} | message: ${message}`,
  );
  // Trả 204 để MoMo biết đã nhận thành công
  res.status(204).send();
});

// GET /momo/return — Nhận query params sau khi redirect từ MoMo
app.get("/momo/return", cors(), (req, res) => {
  const { resultCode, orderId, amount, message, orderInfo } = req.query;
  console.log("[MoMo Return]", req.query);
  res.json({
    resultCode: Number(resultCode),
    orderId,
    amount,
    message,
    orderInfo,
    success: resultCode === "0",
  });
});
app.get("/fashions/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0])
}
);
// Đoạn này đã có trong file index.js của bạn
app.get("/fashions/:id", cors(), async (req, res) => {
  try {
    const result = await fashionCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// EXERCISE 62 & 63: SESSION PROGRAMMING & SHOPPING CART
// ============================================================

// Ex 62: Session Visit Counter
app.get("/contact", (req, res) => {
  if (req.session.visited) {
    req.session.visited++;
    res.json({ message: `You visited this page ${req.session.visited} times` });
  } else {
    req.session.visited = 1;
    res.json({ message: "Welcome to this page for the first time!" });
  }
});

// Ex 63: Mock Products for the Shopping Cart
const MOCK_PRODUCTS = [
  { id: 1, name: "Diamond Promise Ring 1/6 ct tw White Gold", price: 399.99, image: "https://truongan9.github.io/Hinh/1.jpg" },
  { id: 2, name: "Diamond Promise Ring 1/4 ct tw Round/Baguette", price: 529.00, image: "https://truongan9.github.io/Hinh/2.jpg" },
  { id: 3, name: "Diamond Promise Ring 1/6 ct tw Black/White Silver", price: 159.00, image: "https://truongan9.github.io/Hinh/3.jpg" }
];

app.get("/products", (req, res) => {
  res.json(MOCK_PRODUCTS);
});

// Ex 63: View Cart
app.get("/cart/view", (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.json(req.session.cart);
});

// Ex 63: Add to Cart
app.post("/cart/add", (req, res) => {
  const product = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItemIndex = req.session.cart.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    req.session.cart[existingItemIndex].quantity += 1;
  } else {
    req.session.cart.push({ ...product, quantity: 1 });
  }

  res.json(req.session.cart);
});

// Ex 63: Update Cart Quantity
app.post("/cart/update", (req, res) => {
  const { productId, quantity } = req.body;

  if (req.session.cart) {
    const item = req.session.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
    }
  }

  res.json(req.session.cart || []);
});

// Ex 63: Remove from Cart
app.post("/cart/remove", (req, res) => {
  const { productId } = req.body;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.id !== productId);
  }

  res.json(req.session.cart || []);
});

// ============================================================
// EXERCISE 58: PRODUCTS CRUD API
// ============================================================

// GET all products
app.get("/api/products", cors({ origin: 'http://localhost:4200', credentials: true }), async (req, res) => {
  try {
    const result = await productCollection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product by id
app.get("/api/products/:id", cors({ origin: 'http://localhost:4200', credentials: true }), async (req, res) => {
  try {
    const result = await productCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new product
app.post("/api/products", cors({ origin: 'http://localhost:4200', credentials: true }), async (req, res) => {
  try {
    const { name, price, description, image_url } = req.body;
    const result = await productCollection.insertOne({ name, price, description, image_url });
    res.status(201).json({ message: "Product created", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update existing product
app.put("/api/products/:id", cors({ origin: 'http://localhost:4200', credentials: true }), async (req, res) => {
  try {
    const { name, price, description, image_url } = req.body;
    const result = await productCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, price, description, image_url } }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
app.delete("/api/products/:id", cors({ origin: 'http://localhost:4200', credentials: true }), async (req, res) => {
  try {
    const result = await productCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});