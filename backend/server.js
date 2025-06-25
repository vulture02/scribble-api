import express from 'express';
const app= express();

app.get("/api/notes",(req,res)=>{
    res.status(200).send("API is running successfully");
})
app.post("/api/notes",(req,res)=>{
    res.status(201).send({message:"Post request received"});
})
app.put("api/notes/:id ",(req,res)=>{
    res.status(200).send({message:"Put request received"});
})
app.delete("/api/notes/:id",(req,res)=>{
    res.status(200).send({message:"Delete request received"});
})
app.listen(5001,()=>{
    console.log("Server is running on port 5001");
});