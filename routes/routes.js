import express from 'express'
import dotenv from 'dotenv'
import db from '../config/db.js'

dotenv.config();
const router = express.Router()
//sending the todos to the frontend
router.get('/',(req,res)=>{
    const sql = 'select * from todos'
    db.query(sql,(err,result,fields)=>{
        if(err){
            return res.status(500).json({error: err.message})
        }
            return res.status(200).json(result)
    })
})
//creating the todos
router.post('/',(req,res)=>{
    const {title} = req.body;
    if(!title || title.trim()===""){
            return res.status(400).json({error: err.message})
        }
    const query = "insert into todos(title) values(?)"
    db.query(query,[title],(err,result,fields)=>{
        
        if(err){
            console.error(err)
            return res.status(500).json({message: "Title cannot be empty"});
        }
        res.status(201).json({ id : result.insertId,
            title,
            completed: false
        })
    })
})
router.put('/:id',(req,res)=>{
    const {completed} = req.body
    const {id} = req.params
    const query = "update  todos set completed = (?) where id = (?) "
    db.query(query,[completed,id],(err,result)=>{
        if(err)return res.status(500).json({error:err.message})
        if(result.affectedRows === 0){
            return res.status(404).json({message: "Todo not found"})
        }
        res.status(200).json({ id, completed })
    })
})
router.delete('/:id',(req,res)=>{
    const {id} = req.params
    const query = "delete from todos where id = (?)"
    db.query(query,[id],(err,result,fields)=>{
        if(err){
            return res.status(500).json({error: err.message})
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message: "Todo not found"})
        }
        res.status(200).json({message: "Todo deleted successfully"})
    })
})

export default router;