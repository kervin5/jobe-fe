import React from 'react';

import classes from './BackgroundChanger.modules.scss';
const accounting = "../../../../static/images/CategoryImages/Accounting.jpg";
const aerospace = "../../../../static/images/CategoryImages/aerospace.jpg"; 
const customerservice = "../../../../static/images/CategoryImages/customeService.jpg"; 
const engineering = "../../../../static/images/CategoryImages/Engineering.jpg";
const entertainment = "../../../../static/images/CategoryImages/entertainment.jpg"; 
const foodIndustry = "../../../../static/images/CategoryImages/foodindustry.jpg" ;
const health = "../../../../static/images/CategoryImages/health.jpg"; 
const helpdesk = "../../../../static/images/CategoryImages/Helpdesk.jpg"; 
const hr = "../../../../static/images/CategoryImages/HR.jpg"; 
const insurance = "../../../../static/images/CategoryImages/insurance.jpg"; 
const it = "../../../../static/images/CategoryImages/IT.jpg"; 
const language = "../../../../static/images/CategoryImages/language.jpg"; 
const legal = "../../../../static/images/CategoryImages/legal.jpg"; 
const marketing = "../../../../static/images/CategoryImages/marketing.jpg"; 
const other = "../../../../static/images/CategoryImages/Other.jpg"; 
const warehouse = "../../../../static/images/CategoryImages/Warehouse.jpg";


const backgroundImage = (props) => {
    return <div>
                <img src={backgroundChanger(props.image)} className={classes.backgroundChanger}></img> 
            </div>
}

    function backgroundChanger(background) {
        switch(background){
            case 'accounting':
                return accounting;
            case 'aerospace':
                return aerospace;
            case 'customerservice':
                return customerservice;
            case 'engineering':
                return engineering;
            case 'entertainment':
                return entertainment;
            case 'foodIndustry':
                return foodIndustry;
            case 'health':
                return health;
            case 'helpdesk':
                return helpdesk;
            case 'hr':
                return hr
            case 'insurance':
                return insurance;
            case 'it':
                return it;
            case 'language':
                return language;
            case 'legal':
                return legal
            case 'marketing':
                return marketing;
            case 'warehouse':
                return warehouse;
            default:
                return other;

        }
    }

export default backgroundImage;

// className={classes.backgroundChanger}