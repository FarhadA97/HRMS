import React from "react";
import TextField from "../../UI/TextField";
import classes from "./CandidateForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../UI/Button";
import { ICandidate } from "../../../config";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hook";

interface candidateFormProps {
  name: string;
  email: string;
  dob: string;
  field: string;
  contact: string;
  status?: string;
  reference: string;
}

interface Props {
  onAddCandidate: (data: ICandidate) => void;
  onEditCandidate: (data: ICandidate, id: string) => void;
}

const CandidateForm: React.FC<Props> = ({
  onAddCandidate,
  onEditCandidate,
}) => {
  let { id } = useParams();
  let isEdit = false;
  let currentCandidate = useAppSelector((state) =>
    state.candidate.candidates.filter((e) => e._id === id)
  );

  if (currentCandidate.length > 0) {
    isEdit = true;
  }

  const initialCandidateFormValues: candidateFormProps = {
    name: isEdit ? currentCandidate[0].name : "",
    email: isEdit ? currentCandidate[0].email : "",
    dob: isEdit ? currentCandidate[0].dob : "",
    field: isEdit ? currentCandidate[0].field : "",
    contact: isEdit ? currentCandidate[0].contact : "",
    status: "",
    reference: isEdit ? currentCandidate[0].reference : "",
  };

  const candidateFormValidation = Yup.object({
    name: Yup.string()
      .max(15, "*Must be 15 characters or less")
      .required("*Name is required"),

    email: Yup.string()
      .email("*Email is not valid")
      .required("*Email is required"),

    dob: Yup.string().required("*Select Date Of Birth"),

    field: Yup.string()
      .max(15, "*Must be 15 characters or less")
      .required("*Field is required"),

    contact: Yup.string()
      .max(15, "*Must be 15 characters or less")
      .required("*Contact Number is required"),

    reference: Yup.string()
      .max(15, "*Must be 15 characters or less")
      .required("*Reference is required"),

    status: isEdit
      ? Yup.string().required("*Status is required")
      : Yup.string(),
  });

  const submitHandler = (values: candidateFormProps) => {
    const data: ICandidate = {
      name: values.name,
      email: values.email,
      dob: values.dob,
      field: values.field,
      contact: values.contact,
      reference: values.reference,
    };

    if (isEdit) {
      data.status = values.status;
      console.log(data);
      onEditCandidate(data, id!);
      return;
    }
    onAddCandidate(data);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialCandidateFormValues}
      validationSchema={candidateFormValidation}
      validateOnChange={false}
      onSubmit={submitHandler}
    >
      {(formik) => (
        <section className={classes.main}>
          <h2>{!isEdit ? "Add New Candidate" : "Edit Data"}</h2>
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

            {isEdit && <label htmlFor="status">Status</label>}
            {isEdit && (
              <Field as="select" name="status">
                <option value="" disabled>
                  Select Status...
                </option>
                <option value="Under Review">Under Review</option>
                <option value="Short Listed">Short-Listed</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </Field>
            )}
            <ErrorMessage
              component="div"
              name="status"
              className="formik-error"
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
