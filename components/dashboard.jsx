import { useState,useEffect } from 'react';

function dashboard() {
 const [name,setname] = useState("")
const [post,setpost] = useState("")
const [city,setcity] = useState("")
const [salary,setsalary] = useState("")
const [data,setdata] = useState([])
const [editID,seteditId] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
     const payLoad = {name,post,city,salary}
  try{
    if(editID){
      payLoad._id = editID
       res = await fetch(`http://localhost:3000/api/data/${editID}`,{method: "PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(payLoad)})
    }
    else{

       res = await fetch("http://localhost:3000/api/data",{method: "POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payLoad)})
    }
  const result = await res.json()
  if(res.ok){
    alert(result.message)
    setname("")
    setpost("")
    setcity("")
    setsalary("")
    seteditId(null)
    fetchData();
  }
  else{
    alert(result.message)
  }
}catch(error){
  console.log(error.message)
  alert("Something went wrong")
}}
 const fetchData = async () =>{
  const res = await fetch("http://localhost:3000/api/data")
  const result = await res.json()
  setdata(result)
  }
useEffect(() => {
 
    fetchData()
}, [])
const handleDelete = async (id) =>{
  try{
    let confirmation = confirm("Are you sure want to delete this data")
   if(confirmation){
     let res = await fetch(`http://localhost:3000/api/data/${id}`,{ method: "DELETE"})
    let result = await res.json()
    if(res.ok){
      fetchData();
      alert(result.message)
    }
    else{
      alert(result.message)
    }
   }
  }catch(error){
    alert(error.message)
  }

}
const handleEdit = async (id) => {
const itemsToEdit = data.find((item) => item._id === id)
setname(itemsToEdit.name)
setpost(itemsToEdit.post)
setcity(itemsToEdit.city)
setsalary(itemsToEdit.salary)
seteditId(id)
}
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Employee Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Name</label>
            <input onChange={(e) => {setname(e.target.value)}} value={name} type="text" placeholder="Enter your name" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Post</label>
            <input onChange={(e) => {setpost(e.target.value)}} value={post} type="text" placeholder="Enter post" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">City</label>
            <input onChange={(e) => {setcity(e.target.value)}} value={city} type="text" placeholder="Enter city" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Salary</label>
            <input onChange={(e) => {setsalary(e.target.value)}} value={salary} type="number" placeholder="Enter salary" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200">
            Submit
          </button>
        </form>
      </div>
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Submitted Employees</h2>
        <div>
           <div>
         <ul className='flex flex-col gap-2'>
        {data.map((Item,index) =>(
        <div className='border p-2 rounded-xl flex flex-row justify-between bg-gray-100  font-semibold'>
           <div   key={index}>
          <li >Name: <span className='text-blue-600'> {Item.name}</span></li>
          <li >Post: <span className='text-blue-600'>{Item.post}</span></li>
          <li >City: <span className='text-blue-600'> {Item.city}</span></li>
          <li >Salary: <span className='text-blue-600'>{Item.salary}</span></li>
         </div>
         <div className='flex flex-col justify-center items-center gap-2'>
          <div><button onClick={() => handleDelete(Item._id)} className='hover:bg-blue-700 transition duration-200 py-[2px] bg-blue-600 text-white rounded-xl px-2  font-semibold'>Delete</button></div>
          <div><button onClick={() => handleEdit(Item._id)} className='hover:bg-blue-700 transition duration-200 py-[1px] bg-blue-600 text-white rounded-xl px-4  font-semibold'>Edit</button></div>
         </div>
        </div>
         
        ))}
        </ul>
       </div>
      
        </div>
      </div>
    </div>
  );
}

export default dashboard