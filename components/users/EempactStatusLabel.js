import React, { useEffect, useState } from "react";
import { Icon, Label } from "semantic-ui-react";
import axios from "axios";

const EempactStatusLabel = ({ email }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [label, setLabel] = useState("Loaddding");
  useEffect(() => {
    setLoading(true);
    axios({
      method: "post",
      url: "https://api.exactstaff.com/status",
      data: {
        email
      }
    })
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    console.log("effect");
    if (loading) {
      setLabel("Loading");
    } else if (data) {
      if (data.assigments > 0) {
        setLabel(
          <>
            <Label color="green">
              <Icon name="mail" />
              eEmpact
            </Label>
            <Label color="blue">
              <Icon name="mail" />
              Active Assigment
            </Label>
          </>
        );
      } else {
        setLabel(
          <>
            <Label color="green">
              <Icon name="mail" />
              eEmpact
            </Label>
          </>
        );
      }
    } else if (!data) {
      setLabel(
        <Label>
          <Icon name="mail" />
          No eEmpact
        </Label>
      );
    } else if (error) {
      setLabel("Unable to check");
    } else {
      console.log("test");
    }
  }, [data, loading, error]);

  return <p>{label}</p>;
};

export default EempactStatusLabel;
