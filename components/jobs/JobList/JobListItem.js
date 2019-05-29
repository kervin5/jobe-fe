import React from 'react';
import Link from 'next/link';
import Bubble from '../../common/UI/Bubble/Bubble';
import Card from '../../common/UI/Card/Card';
import classes from './JobListItem.module.scss'

const jobListItem = (props) => {
    return(
    
            <Card className={classes.JobListItem} >
                    <div className={classes.JobListItemHeader}>
                        <div>
                            <Link 
                            href={"/jobs/show?slug="+(props.title.split(" ").join("-"))+"-"+props.id}
                            as={"/jobs/show/"+(props.title.split(" ").join("-"))+"-"+props.id}
                            >
                                <a>{props.title}</a>
                            </Link>
                            <p className={classes.Location}>{props.location}</p>
                        </div>
                        <div>
                            <Bubble>
                                ${props.compensation}
                            </Bubble>
                            <Bubble>
                                {props.type}
                            </Bubble>
                        </div>
                    </div>
                    
                    <p className={classes.Content}>
                        {props.description}
                    </p>
            </Card>
       
    );
};

export default jobListItem;