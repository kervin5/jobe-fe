import React, { useEffect, useState } from "react";
import { Icon, Label } from "semantic-ui-react";
import axios from "axios";

const EempactStatusLabel = ({ data }) => {
  let label = "loading";

  if (data && data.id) {
    if (data.assignments > 0) {
      label = (
        <>
          <Label color="green">
            <Icon name="thumbs up outline" />
            eEmpact
          </Label>
          <Label color="blue">
            <Icon name="eye" />
            Active Assigment
          </Label>
        </>
      );
    } else {
      label = (
        <>
          <Label color="green">
            <Icon name="thumbs up outline" />
            eEmpact
          </Label>
        </>
      );
    }
  } else if (!data.id) {
    label = (
      <Label>
        <Icon name="hand point right outline" />
        No eEmpact
      </Label>
    );
  } else {
    label = "Unable to check";
  }

  return <div>{label}</div>;
};

export default EempactStatusLabel;
