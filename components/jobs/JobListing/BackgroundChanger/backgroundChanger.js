import React from "react";

import classes from "./BackgroundChanger.modules.scss";
const accounting = "../../../../images/CategoryImages/Accounting.jpg";
const aerospace = "../../../../images/CategoryImages/aerospace.jpg";
const customerservice = "../../../../images/CategoryImages/customeService.jpg";
const engineering = "../../../../images/CategoryImages/Engineering.jpg";
const entertainment = "../../../../images/CategoryImages/entertainment.jpg";
const foodIndustry = "../../../../images/CategoryImages/foodindustry.jpg";
const health = "../../../../images/CategoryImages/health.jpg";
const helpdesk = "../../../../images/CategoryImages/Helpdesk.jpg";
const hr = "../../../../images/CategoryImages/HR.jpg";
const insurance = "../../../../images/CategoryImages/insurance.jpg";
const it = "../../../../images/CategoryImages/IT.jpg";
const language = "../../../../images/CategoryImages/language.jpg";
const legal = "../../../../images/CategoryImages/legal.jpg";
const marketing = "../../../../images/CategoryImages/marketing.jpg";
const other = "../../../../images/CategoryImages/Other.jpg";
const warehouse = "../../../../images/CategoryImages/Warehouse.jpg";

const backgroundImage = props => {
  return (
    <div>
      <img
        src={backgroundChanger(props.image)}
        className={classes.backgroundChanger}
      ></img>
    </div>
  );
};

function backgroundChanger(background) {
  switch (background) {
    case "accounting":
      return accounting;
    case "aerospace":
      return aerospace;
    case "customerservice":
      return customerservice;
    case "engineering":
      return engineering;
    case "entertainment":
      return entertainment;
    case "foodIndustry":
      return foodIndustry;
    case "health":
      return health;
    case "helpdesk":
      return helpdesk;
    case "hr":
      return hr;
    case "insurance":
      return insurance;
    case "it":
      return it;
    case "language":
      return language;
    case "legal":
      return legal;
    case "marketing":
      return marketing;
    case "warehouse":
      return warehouse;
    default:
      return other;
  }
}

export default backgroundImage;

// className={classes.backgroundChanger}
