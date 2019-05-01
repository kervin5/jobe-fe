// import React from 'react';

// import accounting from '../../../../static/images/CategoryImages/Accounting.jpg';
// import aerospace from '../../../../static/images/CategoryImages/aerospace.jpg';
// import customerservice from '../../../../static/images/CategoryImages/customeService.jpg';
// import engineering from '../../../../static/images/CategoryImages/Engineering.jpg';
// import entertainment from '../../../../static/images/CategoryImages/entertainment.jpg';
// import foodIndustry from '../../../../static/images/CategoryImages/foodindustry.jpg';
// import health from '../../../../static/images/CategoryImages/health.jpg';
// import helpdesk from '../../../../static/images/CategoryImages/Helpdesk.jpg';
// import hr from '../../../../static/images/CategoryImages/HR.jpg';
// import insurance from '../../../../static/images/CategoryImages/insurance.jpg';
// import it from '../../../../static/images/CategoryImages/IT.jpg';
// import language from '../../../../static/images/CategoryImages/language.jpg';
// import legal from '../../../../static/images/CategoryImages/legal.jpg';
// import marketing from '../../../../static/images/CategoryImages/marketing.jpg';
// import other from '../../../../static/images/CategoryImages/Other.jpg';
// import warehouse from '../../../../static/images/CategoryImages/Warehouse.jpg'

// const backgroundChanger = (props) => {

// <div {props.background} className={classes.background}>        
    
// </div>

    function backgroundChanger (background) {
        switch(background){
            case 'accounting':
                return <img src="../../../../static/images/CategoryImages/Accounting.jpg"/>;
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



export default backgroundChanger;