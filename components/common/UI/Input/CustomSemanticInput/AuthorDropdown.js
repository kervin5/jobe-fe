import React from "react";
import DropdownGraphqlInput from "./DropdownGraphqlInput";
import RenderIfLoggedIn from "../../../../hoc/RenderIfLoggedIn";

const AuthorDropdown = props => {
  return (
    <RenderIfLoggedIn permissions={[{ object: "JOB", action: "PUBLISH" }]}>
      <DropdownGraphqlInput
        graphql={{
          query: `query ALL_AUTHORS( $query: String! ) { 
      users(where: { AND: [{role: { NOT: {name: {equals: "candidate"}} }},{name: {contains: $query}}] }) {
        id
        email
        name
      }
    } `
        }}
        {...props}
      />
    </RenderIfLoggedIn>
  );
};

export default AuthorDropdown;
