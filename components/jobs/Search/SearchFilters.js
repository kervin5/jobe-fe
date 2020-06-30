import React from "react";
import SideDrawer from "@/common/UI/Navigation/SideDrawer";
import Form from "@/common/UI/Form";
import Title from "@/common/UI/Title";
import { gql } from "@apollo/client";

export const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      id
      name
    }
  }
`;

const SearchFilters = props => {
  const fields = {
    distance: {
      type: "dropdown",
      placeholder: "Radius",
      value: 0,
      options: [
        { value: 0, label: "5 miles" },
        { value: 10, label: "10 miles" },
        { value: 20, label: "20 miles" },
        { value: 30, label: "30 miles" }
      ]
    },
    type: {
      type: "dropdown",
      placeholder: "Job Type",
      value: "Full Time",
      options: ["Full Time", "Part Type"]
    },
    category: {
      type: "dropdown",
      placeholder: "Select a category",
      options: { query: ALL_CATEGORIES_QUERY, value: "name" }
    }
  };

  return (
    <SideDrawer
      show={props.showFilters}
      close={() => props.setShowFilters(false)}
    >
      <div className="SearchFilters">
        <Title size="m">Filter Jobs</Title>
        <Form fields={fields} buttonText="Filter" onSubmit={props.onChange} />
        <style jsx>{`
          .SearchFilters {
            padding-top: 40px;
          }
        `}</style>
      </div>
    </SideDrawer>
  );
};

export default SearchFilters;

// .SideDrawer::after {
//     content: "";
//     display: block;
//     position: fixed;
//     left: 0;
//     height: 300px;
//     width: 100%;
//     background-color: red;
//   }
