 const { json } = require('express');

const express = require('express');
const cors = require('cors');
 const mysql = require('mysql');
 const app = express();
 app.use(express.json());
 app.use(cors());
 const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'test',
 });
 app.get('/',(req,res)=>{
   res.json("hello this is backend"); 
 });
 app.get('/books',(req,res)=>{
    const q = "select * from books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
 })
 app.post("/books",(req,res)=>{
    const q = "insert into books (`title`,`description`,`cover`,`price`) values(?)";
    const values=[
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
        
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
 });
 app.delete("/books/:id",(req,res)=>{
   const bookId = req.params.id;
   const q = "delete from books where booksId = ?"
   db.query(q,[bookId],(err,data)=>{
      if(err) return res.json(err)
      return res.json("Deleted Successfully");
   })
 });
 app.put("/update/:id",(req,res)=>{
   const bookId = req.params.id;
   const q = "update books set `title`=?, `description` =?,`price` = ?, `cover`= ? where booksId = ? ";
   const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.cover
   ]
   db.query(q,[...values,bookId],(err,data)=>{
      if(err) return res.json(err);
      else return res.json("updated Successfully")
   })
 })
 app.listen(8800,()=>{
    console.log("connexted to backend");
 });
