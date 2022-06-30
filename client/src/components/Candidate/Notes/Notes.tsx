import React, { useState } from "react";
import { ICandidate, INotes } from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
  addCandidateNote,
  deleteCandidateNote,
  editCandidateNote,
} from "../../../store/slices/candidate/CandidateNoteActions";
import Button from "../../UI/Button";
import AddNoteForm from "./AddNoteForm";
import NoteItem from "./NoteItem";
import classes from "./Notes.module.css";

interface Props {
  candidateId: string;
  onCancel: (id: string) => void;
}

const Notes: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const candidate = useAppSelector(
    (state) =>
      state.candidate.candidates.find((e) => e._id === props.candidateId) as ICandidate
  );
  const [notes, setNotes] = useState(candidate.notes!);

  const submitHandler = (note: string) => {
    const noteData: INotes = { id: Math.random().toString(), text: note };
    setNotes((prevState) => [...prevState!, noteData]);
    dispatch(addCandidateNote({ id: props.candidateId, note: noteData }));
  };

  const editHandler = (id:string, newNote: string) => {
    const index = notes?.findIndex((note) => note.id === id)
    const newNotes = [...notes];
    const editedNote = {...newNotes[index]}
    editedNote.text = newNote
    newNotes.splice(index,1,editedNote)
    setNotes(newNotes)
    dispatch(editCandidateNote({id: props.candidateId, editedNotes:newNotes}))


  }

  const deleteHandler = (id: string) => {
    setNotes((prevState) => prevState!.filter((item) => item.id !== id));
    dispatch(deleteCandidateNote({ id: props.candidateId, noteId: id }));
  };


  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>Notes for {candidate.name} </p>
        <Button className="close" onClick={() => props.onCancel(props.candidateId)}>
          X
        </Button>
      </div>

      {notes && notes.length> 0 && <div className={classes.list}>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onDelete={deleteHandler} onEdit={editHandler} />
        ))}
      </div>}
      <AddNoteForm onSubmit={submitHandler} />
    </div>
  );
};

export default Notes;
