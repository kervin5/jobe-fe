import React from "react";

import classes from "./BackgroundChanger.modules.scss";
const accounting = "../../../../public/images/CategoryImages/Accounting.jpg";
const aerospace = "../../../../public/images/CategoryImages/aerospace.jpg";
const customerservice =
  "../../../../public/images/CategoryImages/customeService.jpg";
const engineering = "../../../../public/images/CategoryImages/Engineering.jpg";
const entertainment =
  "../../../../public/images/CategoryImages/entertainment.jpg";
const foodIndustry =
  "../../../../public/images/CategoryImages/foodindustry.jpg";
const health = "../../../../public/images/CategoryImages/health.jpg";
const helpdesk = "../../../../public/images/CategoryImages/Helpdesk.jpg";
const hr = "../../../../public/images/CategoryImages/HR.jpg";
const insurance = "../../../../public/images/CategoryImages/insurance.jpg";
const it = "../../../../public/images/CategoryImages/IT.jpg";
const language = "../../../../public/images/CategoryImages/language.jpg";
const legal = "../../../../public/images/CategoryImages/legal.jpg";
const marketing = "../../../../public/images/CategoryImages/marketing.jpg";
const other = "../../../../public/images/CategoryImages/Other.jpg";
const warehouse = "../../../../public/images/CategoryImages/Warehouse.jpg";

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
