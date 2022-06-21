import React from "react";
import { ICandidate } from "../../../config";
import { useAppDispatch } from "../../../store/hook";
import { addCandidate } from "../../../store/slices/candidate";
import CandidateForm from "./CandidateForm";

const NewCandidate = () => {
  const dispatch = useAppDispatch();
  const addCandidateHandler : (data: ICandidate) => void = (data) => {
    dispatch(addCandidate({data}));
  };

  return (
    <>
      <CandidateForm onAddCandidate={addCandidateHandler} />
    </>
  );
};

export default NewCandidate;
