import React from "react";
import { Form, Formik, FormikHelpers, FormikProps, FormikState } from "formik";
import * as Yup from "yup";
import Button from "../../UI/Button";
import TextField from "../../UI/TextField";

interface Props {
  onSubmit: (note: string) => void;
}

const AddNoteForm: React.FC<Props> = (props) => {

  const noteValidationSchema = Yup.object({
    note: Yup.string().required("Cannot be empty"),
  });

  const submitHandler = (values:{note:string}) => {
    props.onSubmit(values.note);
  };

  return (
    <Formik
      initialValues={{ note: "" }}
      validationSchema={noteValidationSchema}
      validateOnBlur={false}
      onSubmit={(values:{note:string},{resetForm}) =>{
          submitHandler(values)
          resetForm()
      }}
    >
      {({ resetForm }) => (
        <Form>
          <TextField type="text" name="note" placeholder="Add a new note.." />

          <Button className="submit" type="submit">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddNoteForm;
