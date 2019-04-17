import React from 'react'

import classes from './JobListing.modules.scss'
import Title from '../../common/UI/Title/Title';

const jobListing = () => (
    <div className={classes.cont}>
        <div className={classes.header}>
            <Title size={""}>Job Title</Title>
        </div>
        <Title size={"m"}>location</Title>
        <Title size={"s"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ipsa
            nulla sit? Adipisci assumenda dignissimos doloremque dolorum ducimus
            earum eligendi illum iste, itaque natus nemo neque nulla rerum sunt velit.</Title>
        <Title size={"m"}>Responsabilities</Title>
        <Title size={"s"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ipsa
            nulla sit? Adipisci assumenda dignissimos doloremque dolorum ducimus
            earum eligendi illum iste, itaque natus nemo neque nulla rerum sunt velit.</Title>
        <button>Apply</button>
        <button>Add to Viewing</button>
    </div>
)

export default jobListing