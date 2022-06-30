import React, { useState } from "react";
import { INotes } from "../../../config";
import Button from "../../UI/Button";
import classes from "./Notes.module.css";

interface Props {
  note: INotes;
  onDelete: (id: string) => void;
  onEdit: (id:string, newNote:string) => void;
}

const NoteItem: React.FC<Props> = (props) => {
  const [editNoteText, setEditNoteText] = useState("");
  const [editNoteId, setEditNoteId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const editClickHandler = (
    id: string,
    text: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsEdit(true);
    setEditNoteId(id);
    setEditNoteText(text);
  };

  const editSubmitHandler = (id: string) => {
    props.onEdit(id, editNoteText);
    setIsEdit(false);
    setEditNoteId("");
    setEditNoteText("");
  };

  const deleteHandler = (id: string) => {
    props.onDelete(id);
  };

  return (
    <div className={classes.item} key={props.note.id}>
      <input
        type="text"
        disabled={editNoteId ? !(props.note.id === editNoteId) : !isEdit}
        onChange={(e) => setEditNoteText(e.target.value)}
        value={
          isEdit && props.note.id === editNoteId
            ? editNoteText
            : `• ${props.note.text}`
        }
      />
      <div className={classes.noteBtns}>
        {isEdit && props.note.id === editNoteId && (
          <Button
            className="actions"
            onClick={editSubmitHandler.bind(null, props.note.id)}
          >
            done
          </Button>
        )}
        {!isEdit && editNoteId !== props.note.id && (
          <Button
            disabled={editNoteId ? editNoteId !== props.note.id : false}
            className="actions"
            onClick={editClickHandler.bind(
              null,
              props.note.id,
              props.note.text
            )}
          >
            edit
          </Button>
        )}
        <Button
          className="actions"
          onClick={deleteHandler.bind(null, props.note.id)}
        >
          delete
        </Button>
      </div>
    </div>
  );
};

export default NoteItem;
