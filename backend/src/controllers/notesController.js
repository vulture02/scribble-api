import Note from "../models/Note.js";

export  async function getAllNotes(req, res) {
    try{
        const notes=await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);

    }catch(error){
        console.error("Error fetching notes:", error)
        res.status(500).json({message:"Error fetching notes", error: error.message});

    }
   
}
export async function getNoteById(req,res) {
    try{
        const note=await Note.findById(req.params.id)
        if(!note)return res.status(404).json({message:"Note not Found"});
        res.json(note)


    }catch(error){
         console.error("Error fetching notes:", error)
        res.status(500).json({message:"Error fetching notes", error: error.message});
            
    }

    
}
export async function createNote(req,res){
    try{
        const {title,content}=req.body;
        const note=new Note({title, content});
       const savedNote= await note.save();
        res.status(201).json(savedNote);
    }catch(error){
        

    }
}
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true } // return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Error updating note" });
    }
}

export async function deleteNote (req,res){
    try{
        const deleteNote=await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote){
            return res.status(404).json({ message: "Note not found" });
        }
        else{
            res.status(200).json({ message: "Note deleted successfully" });
        }

    }
    catch(error){
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Error deleting note" });

    }
}