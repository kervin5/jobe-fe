import React from 'react';

import classes from './Header.modules.scss';
import Title from '../../../common/UI/Title/Title';
import Icon from '../Icon/Icon';

const header = (props) => (

    <div className={classes.header} >
        {/* <div><BackgroundChanger image={"it"}/></div> */}
            <Title size={'l'}>{props.title}</Title>
            <Title size={"m"}>{props.location}</Title>
            {/* <Icon icon={"heart"} color={"red"} float={"right"} size="1x"/>  */}

        {/* <style jsx>{`
            .bg-image: {
                filter: blur(8px);
                -webkit-filter: blur(100px);
 
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                width:40%;
            }
        `}</style> */}
    </div>
)

export default header

//, BackgroundChanger(accounting) ].join(' ')

// className={"bg-image"}