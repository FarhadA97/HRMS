import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { getCandidates } from "../../../store/slices/candidate/CandidateActions";
import Button from "../../UI/Button";
import CandidateItem from "./CandidateItem";
import classes from "./Candidates.module.css";

const Candidates = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const candidatesList = useAppSelector((state) => state.candidate.candidates);

  const clickHandler = () => {
    navigate("/add");
  };

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

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
