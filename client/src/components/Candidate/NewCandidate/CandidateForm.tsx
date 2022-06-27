import React from "react";
import TextField from "../../UI/TextField";
import classes from "./CandidateForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../UI/Button";
import { ICandidate } from "../../../config";

interface candidateFormProps {
  name: string;
  email: string;
  dob: string;
  field: string;
  contact: string;
  //status: string;
  reference: string;
}

const CandidateForm: React.FC<{ onAddCandidate: (data: ICandidate) => void }> = ({
  onAddCandidate,
}) => {
  const initialCandidateFormValues: candidateFormProps = {
    name: "",
    email: "",
    dob: "",
    field: "",
    contact: "",
    //status: '',
    reference: "",
  };

  const candidateFormValidation = Yup.object({
    name: Yup.string()
      .max(15, "*Must be 15 characters or less")
      .required("*Name is required"),

    email: Yup.string()
      .email("*Email is not valid")
      .required("*Email is required"),

    dob: Yup.string().required("Select Date Of Birth"),

    field: Yup.string()
      .max(15, "*Must be 15 characters or less")
      .required("*Field is required"),

    contact: Yup.string()
      .max(15, "*Must be 15 characters or less")
      .required("Contact Number is required"),

    reference: Yup.string()
      .max(15, "*Must be 15 characters or less")
      .required("*Reference is required"),

    // status: Yup.string()
    // .max(15,"Must be 15 characters or less")
    // .required("Name is required"),
  });

  const submitHandler = (values: candidateFormProps) => {
    const data: ICandidate = {
      name:values.name,
      email:values.email,
      dob:values.dob,
      field:values.field,
      contact:values.contact,
      reference:values.reference
    }
    onAddCandidate(data);
  };

  return (
    <Formik
      initialValues={initialCandidateFormValues}
      validationSchema={candidateFormValidation}
      validateOnChange={false}
      onSubmit={submitHandler}
    >
      {(formik) => (
        <section className={classes.main}>
          <h2>Add New Candidate</h2>
          <Form>
            <TextField
              label="Name"
              type="text"
              name="name"
              placeholder="name"
            />
            <TextField
              label="Email"
              type="text"
              name="email"
              placeholder="something@mail.com"
            />
            <TextField
              label="Date of Birth"
              type="date"
              name="dob"
              placeholder="DOB"
            />
            <TextField
              label="Field"
              type="text"
              name="field"
              placeholder="field"
            />
            <TextField
              label="Contact"
              type="text"
              name="contact"
              placeholder="contact"
            />
            <TextField
              label="Reference"
              type="text"
              name="reference"
              placeholder="reference"
            />
            <div className={classes.actions}>
              <Button className="submit" type="submit">
                Submit
              </Button>
            </div>
            
          </Form>
        </section>
      )}
    </Formik>
  );
};

export default CandidateForm;
