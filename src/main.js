import express from "express"
import mongoose from "mongoose"
import { data } from "../models/Data.js"; 
import cors from "cors";
const app = express()
const port = 3000
await mongoose.connect('mongodb://localhost:27017/Dummyd');
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173",
    "https://employees-db.vercel.app"
 }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/api/data', async (req, res) => {
    try{
        const newData = new data(req.body)
    await newData.save();
    res.status(201).json({message: "Data saved successfully"})
    }catch(error){
    res.status(500).json({error: error.message})
        
    }
    
})
app.get('/api/data', async (req, res) => {
  try{
    const allData = await data.find()
   res.json(allData)
  }catch(error){
    res.status(500).json({error:error.message})
  }
    
})
app.delete('/api/data/:id', async (req,res) => {
    try{
        const {id} = req.params;
        await data.findByIdAndDelete(id)
        res.status(200).json({message:"Data deleted successfully"})
    }catch(error){
        res.status(500).json({error:error.message})
    }

})
app.put('/api/data/:id', async (req,res) => {
   try{
    const {id} = req.params;
    const updated = await data.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({message:"Updated successfully"})
   }catch(error){
    res.status(500).json({error:error.message})
   }
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
