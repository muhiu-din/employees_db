import mongoose from "mongoose";
 
const DataSchema = new mongoose.Schema({
  name: String,
  post: String,
  city: String,
  salary: Number
});

export const data = mongoose.model('Data', DataSchema);