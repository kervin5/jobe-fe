import React from "react";
import DropdownGraphqlInput from "./DropdownGraphqlInput";
import RenderIfLoggedIn from "../../../../hoc/RenderIfLoggedIn";

const AuthorDropdown = props => {
  return (
    <RenderIfLoggedIn permissions={[{ object: "JOB", action: "PUBLISH" }]}>
      <DropdownGraphqlInput
        graphql={{
          query: `query ALL_AUTHORS( $query: String! ) { 
      users(where: { AND: [{role: { name_not: "candidate" }},{name_contains: $query}] }, orderBy: name_ASC) {
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
