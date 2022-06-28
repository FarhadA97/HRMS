import React from "react";
import { useNavigate } from "react-router-dom";
import { ICandidate } from "../../../config";
import { useAppDispatch } from "../../../store/hook";
import { addCandidate, editCandidate } from "../../../store/slices/candidate/CandidateActions";
import CandidateForm from "./CandidateForm";

const NewCandidate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addCandidateHandler : (data: ICandidate) => void = (data) => {

    dispatch(addCandidate({data}))
      .unwrap()
      .then(() => {
        navigate('/candidates')
      })
      .catch((e) => {})
  };

  const editCandidateHandler : (data: ICandidate, id: string) => void = (data,id) => {

    dispatch(editCandidate({data,id}))
      .unwrap()
      .then(() => {
        navigate('/candidates')
      })
      .catch((e) => {})
  }

  return (
    <>
      <CandidateForm onAddCandidate={addCandidateHandler} onEditCandidate={editCandidateHandler} />
    </>
  );
};

export default NewCandidate;
