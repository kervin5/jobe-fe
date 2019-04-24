import React from 'react'

import classes from './JobListing.modules.scss'
import Title from '../../common/UI/Title/Title';
import Button from '../../common/UI/Button/Button';
import Jobinfo from './Jobinfo/jobInfo';

const jobListing = () => (
    <div className={classes.cont}>
            <Jobinfo title={"Date Added:"}>04/23/2019</Jobinfo>

            <div className={classes.header}>
                <Title>Job Title</Title>
            </div>

           <Title size={"m"}>Description:</Title>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ipsa
            nulla sit? Adipisci assumenda dignissimos doloremque dolorum ducimus
            earum eligendi illum iste, itaque natus nemo neque nulla rerum sunt velit.</p>

            <Title size={"m"}>Responsabilities:</Title>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ipsa
            nulla sit? Adipisci assumenda dignissimos doloremque dolorum ducimus
            earum eligendi illum iste, itaque natus nemo neque nulla rerum sunt velit.</p>

            <Button title={"Apply"}/>
            <Button title={"Add to Favorites"} />
        </div>
)

export default jobListing