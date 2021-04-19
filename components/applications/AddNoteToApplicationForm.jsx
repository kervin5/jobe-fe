import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { gql } from "@apollo/client";
import styled from "styled-components";
import { APPLICATION_NOTES_QUERY } from "./ApplicationHistoryFeed";
import appText from "@/lang/appText";

const StyledAddNoteToApplicationForm = styled.div`
  .BottomArea {
    display: flex;
    width: 100%;
    margin-top: 10px;
  }

  textarea {
    max-height: 100px !important;
  }

  .Errors {
    flex: 1;
  }
`;

const CREACTE_APPLICATION_NOTE_MUTATION = gql`
  mutation CREACTE_APPLICATION_NOTE_MUTATION($id: ID!, $content: String!) {
    createApplicationNote(id: $id, content: $content) {
      id
      content
    }
  }
`;

export default function AddNoteToApplicationForm({
  applicationId,
  refetchQueries,
}) {
  const [
    createApplicationNoteMutation,
    { error, loading, data },
  ] = useMutation(CREACTE_APPLICATION_NOTE_MUTATION, { refetchQueries });
  const { register, handleSubmit, watch, errors } = useForm();
  const [noteContent, setNoteContent] = useState("");
  const onSubmit = async (createApplicationNoteMutation, data) => {
    const result = await createApplicationNoteMutation({
      variables: { id: applicationId, content: data.noteContent },
      refetchQueries: [
        { query: APPLICATION_NOTES_QUERY, variables: { id: applicationId } },
      ],
    });
    //console.log(result);
    if (result.data.createApplicationNote) {
      setNoteContent("");
    }
  };

  //   console.log(watch('noteContent')) // watch input value by passing the name of it

  return (
    <StyledAddNoteToApplicationForm>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(createApplicationNoteMutation, data)
        )}
        disabled={loading}
      >
        <TextField
          multiline
          variant="outlined"
          fullWidth
          name="noteContent"
          ref={register({ required: true })}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder={appText.messages.note.enterContent}
        />
        <div className="BottomArea">
          <div className="Errors">
            {errors.noteContent && (
              <span>{appText.messages.validation.required}</span>
            )}
            {error && <span>{error}</span>}
            {data && !data.createApplicationNote && (
              <span>Something went wrong!</span>
            )}
            {data && data.createApplicationNote && <span>Note Added!</span>}
          </div>
          <Button variant="contained" type="submit">
            {appText.actions.add}
          </Button>
        </div>
      </form>
    </StyledAddNoteToApplicationForm>
  );
}
