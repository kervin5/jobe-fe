import React from 'react'

import classes from './JobListing.modules.scss'
import Title from '../../common/UI/Title/Title';
import Button from '../../common/UI/Button/Button';

import Jobinfo from './Jobinfo/jobInfo';

const jobListing = () => (
    <div className={classes.cont}>

        <div className={classes.header}>
            <Title size={"m"}>Job Title</Title>
            <Title size={"m"}>Target- Santa Monica</Title>
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

            <Button>Apply</Button>
        </div>
    </div>
)

export default jobListing