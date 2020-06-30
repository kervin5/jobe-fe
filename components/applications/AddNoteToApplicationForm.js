import React, { useState } from "react";
import useForm from "react-hook-form";
import { Form, Button } from "semantic-ui-react";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/react-components";
import { APPLICATION_NOTES_QUERY } from "./ApplicationHistoryFeed";

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
  refetchQueries
}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [noteContent, setNoteContent] = useState("");
  const onSubmit = async (createApplicationNoteMutation, data) => {
    const result = await createApplicationNoteMutation({
      variables: { id: applicationId, content: data.noteContent },
      refetchQueries: [
        { query: APPLICATION_NOTES_QUERY, variables: { id: applicationId } }
      ]
    });
    //console.log(result);
    if (result.data.createApplicationNote) {
      setNoteContent("");
    }
  };

  //   console.log(watch('noteContent')) // watch input value by passing the name of it

  return (
    <Mutation mutation={CREACTE_APPLICATION_NOTE_MUTATION}>
      {(createApplicationNoteMutation, { error, loading, data }) => {
        return (
          <Form
            onSubmit={handleSubmit(data =>
              onSubmit(createApplicationNoteMutation, data)
            )}
            loading={loading}
          >
            <textarea
              name="noteContent"
              ref={register({ required: true })}
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              placeholder="Enter note content"
            />
            <div className="BottomArea">
              <div className="Errors">
                {errors.noteContent && <span>This field is required</span>}
                {error && <span>{error}</span>}
                {data && !data.createApplicationNote && (
                  <span>Something went wrong!</span>
                )}
                {data && data.createApplicationNote && <span>Note Added!</span>}
              </div>
              <Button type="submit">Add</Button>
            </div>
            <style jsx>{`
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
            `}</style>
          </Form>
        );
      }}
    </Mutation>
  );
}
