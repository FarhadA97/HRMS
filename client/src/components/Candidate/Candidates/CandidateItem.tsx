import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INotes } from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {deleteCandidate } from "../../../store/slices/candidate/CandidateActions";
import Button from "../../UI/Button";
import Notes from "../Notes/Notes";
import classes from './CandidateItem.module.css'



interface candidateData {
  name: string;
  email: string;
  dob: string;
  contact: string;
  field: string;
  reference: string;
  status?: string;
  notes? : INotes[];
  _id?: string;
}

interface Props {
  list: candidateData[];
}

const CandidateItem: React.FC<Props> = (props) => {
  const isLoading = useAppSelector(state => state.candidate.loading);
  const [notesId, setNotesId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const notesHandler = (id:string) => {
      setNotesId((prevState) => 
        prevState = prevState === id ? null : id
      )
  }
  
  if(isLoading) return <h2 style={{textAlign : 'center'}}>Loading...</h2>
  
  if(props.list.length === 0){
    return (<h2 style={{textAlign : 'center'}}>There are no candidates.</h2>)
  }
  return (
    <div className={classes['candidate-item']}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Field</th>
            <th>Reference</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item) => item && (
            <tr key={item._id}>
              <th>{item.name}</th>
              <th>{item.email}</th>
              <th>{item.dob}</th>
              <th>{item.contact}</th>
              <th>{item.field}</th>
              <th>{item.reference}</th>
              <th>{item.status}</th>
              <th>
                <div className={classes.btn}>
                  <Button className="actions" onClick={() => navigate(`/candidates/edit/${item._id}`)}>Edit</Button>
                  <Button className="actions" onClick={() => {dispatch(deleteCandidate({id:item._id ? item._id : ''}))}}>Delete</Button> 
                  <Button className="actions" onClick={notesHandler.bind(null,item._id!)} > {notesId === item._id ? 'Hide Notes' : 'View Notes'} </Button>
                  {notesId === item._id && <Notes candidateId={item._id} onCancel = {notesHandler} />}
                </div>
                
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateItem;
