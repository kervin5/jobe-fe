import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import classes from './Layout.module.scss';
import NavigationBar from '../UI/NavigationBar/NavigationBar.js';
import Head from '../../head.js';

library.add(fas);

const layout = (props) => {
    return (
        <div className={classes.Layout}>
            <Head title={props.title} />
            {props.hideNav ? null : <NavigationBar/> }
            <main>
                {props.children}
            </main>
            <style jsx global>{`
                * { 
                    box-sizing: border-box; 
                    margin: 0; 
                    padding: 0;
                    font-family: 'Poppins', sans-serif; 
                  }
                  
                  p {
                    font-weight: 300;
                  }
                
            `}</style>
        </div>
    );
};

export default layout;