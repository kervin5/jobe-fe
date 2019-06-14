import React from 'react';

// import classes from './Layout.module.scss';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Head from '../../head.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import NavigationBar from '../UI/Navigation/NavigationBar';



library.add(fas);

const layout = (props) => {
    return (
        <div className="Layout">
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
                    font-family: 'Lato', sans-serif; 
                  }
                  
               

                  .Layout {
                      min-height: 100%;
                     
                  }
                  
                  p {
                    line-height: 1.6em;
                  }

                  main {
                    height: 100%;
                  }
                
            `}</style>
        </div>
    );
};

export default layout;