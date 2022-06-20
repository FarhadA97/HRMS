import React from 'react'
import { ICandidate } from '../../../config'
import CandidateForm from './CandidateForm'

const NewCandidate = () => {

    const addCandidateHandler = (data:ICandidate) => {
      console.log(data)
    }

  return (
    <>
        <CandidateForm onAddCandidate={addCandidateHandler} />
    </>
  )
}

export default NewCandidate