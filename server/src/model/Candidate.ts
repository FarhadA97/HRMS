import { Schema, model, Document } from "mongoose";

export interface ICandidate extends Document {
    name: string;
    email: string;
    dob: string;
    field: string;
    contact: string;
    status?: string;
    reference: string;
    notes: {id:string, text:string}[];
}

const candidateSchema: Schema = new Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  field: { type: String, required: true },
  contact: { type: String, required: true },
  status: { type: String, default: 'N/A'},
  reference: { type: String, required: true},
  notes: {type: [Object], default: []}
});

export default model<ICandidate>("Candidate", candidateSchema);