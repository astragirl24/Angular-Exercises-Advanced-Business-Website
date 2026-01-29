const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Import CORS
const app = express();
const port = 3000;
// 1. Kích hoạt Morgan (Log)
app.use(morgan("combined"));
// 2. Kích hoạt CORS (Cho phép truy cập từ tên miền khác)
app.use(cors());
// 3. Cấu hình folder ảnh
// Truy cập qua web bằng link: /img/ten-anh.jpg
app.use('/img', express.static('public_image'));
// 4. Database Sách
let database = [
    {"BookId":"b1", "BookName":"Book 1", "Price":70,  "Image":"b1.jpg"},
    {"BookId":"b2", "BookName":"Book 2", "Price":100, "Image":"b2.jpg"},
    {"BookId":"b3", "BookName":"Book 3", "Price":200, "Image":"b3.jpg"},
    {"BookId":"b4", "BookName":"Book 4", "Price":300, "Image":"b4.jpeg"},
    {"BookId":"b5", "BookName":"Book 5", "Price":250, "Image":"b5.jpg"},
];

// --- API TRANG CHỦ (Giao diện HTML cho khách bấm) ---
app.get('/', (req, res) => {
    let html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>Danh sách Sách</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1 { color: #2c3e50; }
            ul { list-style-type: none; padding: 0; }
            li { 
                background: #f9f9f9; 
                margin: 5px 0; 
                padding: 10px; 
                border-left: 5px solid #3498db; 
            }
            a { text-decoration: none; color: #e74c3c; font-weight: bold; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <p>Click vào link để xem ảnh chi tiết:</p>
        <ul>
    `;

    // Tạo danh sách HTML từ Database
    database.forEach(book => {
        html += `
            <li>
                <b>${book.BookName}</b> - Giá: $${book.Price} 
                👉 <a href="/img/${book.Image}" target="_blank">Xem ảnh bìa</a>
            </li>
        `;
    });

    html += `
        </ul>
        <hr>
        <p><small>API JSON data: <a href="/books">/books</a></small></p>
    </body>
    </html>
    `;

    res.send(html);
});

// --- API TRẢ VỀ DỮ LIỆU JSON (Dành cho Dev/Frontend) ---
app.get('/books', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`; 
    const booksWithFullImages = database.map(book => {
        return {
            ...book, 
            Image: `${baseUrl}/img/${book.Image}` 
        };
    });
    res.json(booksWithFullImages);
});

// Chạy server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});