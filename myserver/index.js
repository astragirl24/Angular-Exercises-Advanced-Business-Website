const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/img', express.static('public_image'));
//database giả lập
let database = [
    {"BookId":"b1", "BookName":"Book 1", "Price":70,  "Image":"b1.jpg"},
    {"BookId":"b2", "BookName":"Book 2", "Price":100, "Image":"b2.jpg"},
    {"BookId":"b3", "BookName":"Book 3", "Price":200, "Image":"b3.jpg"},
    {"BookId":"b4", "BookName":"Book 4", "Price":300, "Image":"b4.jpeg"},
    {"BookId":"b5", "BookName":"Book 5", "Price":250, "Image":"b5.jpg"},
]
let laptopDatabase = [
    { Id: 'Lap01', Name: 'Dell Alienware M15', Price: 25000000, Image: 'Dell.jpg'},
    { Id: 'Lap02', Name: 'Asus ROG Strix', Price: 20000000, Image: 'Asus.png'},
    { Id: 'Lap03', Name: 'MacBook Pro M3', Price: 48000000, Image: 'Mac.jpg'},
]
app.get('/', (req, res) => {
    let html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>Server API</title>
        <style>body { font-family: sans-serif; padding: 20px; }</style>
    </head>
    <body>
        <h1>Server đang chạy ổn định!</h1>
        <p>Các đường dẫn API:</p>
        <ul>
            <li>API Sách: <a href="/books">/books</a></li>
            <li>API Laptop: <a href="/laptops">/laptops</a> (Mới)</li>
        </ul>
    </body>
    </html>
    `;
    res.send(html);
})
/////////////API LẤY LIST SÁCH//////////////
app.get('/books', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const result = database.map(item => {
        return {
            ...item,
            Image: `${baseUrl}/img/${item.Image}` 
        };
    });
    res.json(result);
});
/////////////API LẤY CHI TIẾT SÁCH//////////////
app.get('/books/:id', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`; 
    let id = req.params.id;
    let book = database.find(b => b.BookId == id);
    if (book) {
        let bookWithFullImage = {
            ...book,
            Image: `${baseUrl}/img/${book.Image}`
        };
        res.json(bookWithFullImage);
    } else {
        res.json({ "message": "Not found" });
    }
});
/////////////API thêm sách mới//////////////
app.post('/books', (req, res) => {
    let book = req.body; 
    database.push(book); 
    res.json({ "message": "Thêm thành công", "data": book });
});
/////////////API sửa thông tin sách//////////////
app.put('/books', (req, res) => {
    let book = req.body;
    let index = database.findIndex(b => b.BookId == book.BookId);
    if (index >= 0) {
        database[index] = book; 
        res.json({ "message": "Cập nhật thành công", "data": book });
    } else {
        res.json({ "message": "Không tìm thấy sách để sửa" });
    }
});
/////////////API xóa sách//////////////
app.delete('/books/:id', (req, res) => {
    let id = req.params.id;
    let index = database.findIndex(b => b.BookId == id);
    if (index >= 0) {
        database.splice(index, 1); 
        res.json({ "message": "Xóa thành công" });
    } else {
        res.json({ "message": "Không tìm thấy sách" });
    }
});
/////////////API LẤY LIST LAPTOP//////////////
app.get('/laptops', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const result = laptopDatabase.map(item => {
        return {
            ...item,
            Image: `${baseUrl}/img/${item.Image}` 
        };
    });
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});