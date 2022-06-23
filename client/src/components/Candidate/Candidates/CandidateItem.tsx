import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {deleteCandidate } from "../../../store/slices/candidate/CandidateActions";
import Button from "../../UI/Button";
import classes from './CandidateItem.module.css'
interface candidateData {
  name: string;
  email: string;
  dob: string;
  contact: string;
  field: string;
  reference: string;
  status?: string;
  _id?: string;
}

interface Props {
  list: candidateData[];
}

const CandidateItem: React.FC<Props> = (props) => {
  const isLoading = useAppSelector(state => state.candidate.loading);
  const dispatch = useAppDispatch();
  
  if(isLoading){
    return (<h2 style={{textAlign : 'center'}}>Loading...</h2>)
  }
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
          {props.list.map((item) => (
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
                  <Button className="actions">Edit</Button>
                  <Button className="actions" onClick={() => {dispatch(deleteCandidate({id:item._id ? item._id : ''}))}}>Delete</Button> 
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
