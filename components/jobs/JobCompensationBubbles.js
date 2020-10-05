import React from "react";
import Bubble from "@/common/UI/Bubble";
import { currency } from "@/root/config";

const JobCompensationBubbles = (props) => {
  return (
    <Bubble color="1">
      {props.minCompensation > 0 && props.maxCompensation > 0
        ? `${currency}${numberWithCommas(
            parseFloat(props.minCompensation).toFixed(2)
          )} - ${currency}${numberWithCommas(
            parseFloat(props.maxCompensation).toFixed(2)
          )}`
        : null}
      {props.minCompensation > 0 && props.maxCompensation === 0
        ? `${currency}${numberWithCommas(
            parseFloat(props.minCompensation).toFixed(2)
          )} - DOE`
        : null}

      {props.minCompensation === 0 ? `DOE` : null}
    </Bubble>
  );
};

export function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export default JobCompensationBubbles;
