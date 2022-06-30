import { RequestHandler } from "express";
import mongoose from "mongoose";
import CandidateModel, { ICandidate } from '../model/Candidate';

export const addNote : RequestHandler = async (req,res) => {
    const { id } = req.params;
    
    const {note} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No candidate with id: ${id}`);
    const candidate = await CandidateModel.findById(id);
    if(candidate){
        candidate.notes.push(note) 
        await CandidateModel.findByIdAndUpdate(id, candidate, {new: true});
    }
    res.json({message: "Note Added"});
}

export const deleteNote : RequestHandler = async (req,res) => {
    const { id } = req.params;
    
    const { noteId } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No candidate with id: ${id}`);
    const candidate = await CandidateModel.findById(id);
    
    if(candidate){
        const updatedNotes = candidate.notes.filter(note => note.id !== noteId);
        candidate.notes = updatedNotes.splice(0)
        await CandidateModel.findByIdAndUpdate(id, candidate, {new: true});
    }
    res.json({message: "Note Deleted"});
}

export const editNote : RequestHandler = async (req,res) => {
    const { id } = req.params

    const editedNotes : {id:string,text:string}[]  = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No candidate with id: ${id}`);
    const candidate = await CandidateModel.findById(id);
    if(candidate){
        candidate.notes = editedNotes.splice(0)
        await CandidateModel.findByIdAndUpdate(id, candidate, {new: true});
    }
    res.json({message: "Note Edited"});

}