export function getAllNotes(req, res) {
    res.status(200).send("you fetched notes");
}
export function createNote(req,res){
    res.status(201).send({message:"Post request received"});
}
export function updateNote(req,res){
    res.status(200).send({message:"Put request received"});
}
export function deleteNote (req,res){
    res.status(200).send({message:"Delete request received"});
}