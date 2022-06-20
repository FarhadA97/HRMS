import React from 'react'
import CandidateForm from './CandidateForm'

const NewCandidate = () => {

    const addCandidateHandler = (data:any) => {

    }

  return (
    <>
        <CandidateForm onAddCandidate={addCandidateHandler} />
    </>
  )
}

export default NewCandidate