import React, { useEffect, useState } from "react";
import { Icon, Label } from "semantic-ui-react";
import axios from "axios";

const EempactStatusLabel = ({ data }) => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  // const [data, setData] = useState(null);
  let label = "loading";
  // useEffect(() => {
  //   setLoading(true);
  //   setData(null);
  //   setError(false);
  //   setLabel("Loading");

  //   axios({
  //     method: "post",
  //     url: "https://api.exactstaff.com/status",
  //     data: {
  //       email
  //     }
  //   })
  //     .then(res => {
  //       setLoading(false);
  //       setData(res.data);
  //     })
  //     .catch(e => {
  //       setLoading(false);
  //       setError(true);
  //     });
  // }, [email]);

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
