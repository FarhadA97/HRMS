import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hook";
import Button from "../../UI/Button";
import CandidateItem from "./CandidateItem";
import classes from "./Candidates.module.css";

const Candidates = () => {
  const navigate = useNavigate();
  const candidatesList = useAppSelector((state) => state.candidate.candidates);

  const clickHandler = () => {
    navigate("/add");
  };

  

  return (
    <>
      <div className={classes["add-btn"]}>
        <Button className="submit" onClick={clickHandler}>
          + Add new candidate
        </Button>
      </div>
      <CandidateItem list={candidatesList} />
    </>
  );
};

export default Candidates;
