import React, { useEffect } from 'react'
import Candidates from '../components/Candidate/Candidates/Candidates'
import { useAppDispatch } from '../store/hook';
import { getCandidates } from '../store/slices/candidate/CandidateActions';

const CandidatesPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);
  
  return (
    <Candidates />
  )
}

export default CandidatesPage