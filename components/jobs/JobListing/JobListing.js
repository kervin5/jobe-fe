import React from 'react'

import classes from './JobListing.modules.scss';
import Title from '../../common/UI/Title/Title';
import Button from '../../common/UI/Button/Button';
import Icon from '../JobListing/Icon/Icon';
//import backgroundChanger from './BackgroundChanger/backgroundChanger';

const jobListing = () => (
    <div className={classes.cont}>
        
        <div>
            <div className={classes.header}>
                <Title size={"l"}>Job Title</Title>
                <Title size={"s"}>Target- Santa Monica</Title>
                <Icon icon="heart" color='red' />
            </div>
        </div>

        <div className={classes.Body}>
            <Title size={"m"}>About Target</Title>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ipsa
                nulla sit? Adipisci assumenda dignissimos doloremque dolorum ducimus
                earum eligendi illum iste, itaque natus nemo neque nulla rerum sunt velit.</p>

            <Title size={"m"}>Responsabilities:</Title>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ipsa
                nulla sit? Adipisci assumenda dignissimos doloremque dolorum ducimus
                earum eligendi illum iste, itaque natus nemo neque nulla rerum sunt velit.</p>

            <Title size={"m"}>Requirements:</Title>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ipsa
                nulla sit? Adipisci assumenda dignissimos doloremque dolorum ducimus
                earum eligendi illum iste, itaque natus nemo neque nulla rerum sunt velit.</p>

            <Button className={classes.Button}>Apply</Button>

            {/* <Title size="m" className={classes.Button}>Share:</Title>
            <Icon icon="heart" color='red' />
            <Icon icon="heart" color='red' /> */}

        </div>
    </div>
)

export default jobListing