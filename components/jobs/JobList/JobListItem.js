import React from 'react';

import classes from './JobListItem.module.scss'
import Bubble from '../../common/UI/Bubble/Bubble';
import Icon from '../../common/UI/Icon/Icon';
import Card from '../../common/UI/Card/Card';
import {Link} from '../../../routes';


const jobListItem = (props) => {
    return(
    
            <Card className={classes.JobListItem} >
                    <div className={classes.JobListItemHeader}>
                        <div>
                            <Link route={"/jobs/"+(props.title.split(" ").join("-"))+"-"+props.id}>
                                <a>{props.title}</a>
                            </Link>
                            <p className={classes.Location}><Icon icon="map-marker-alt" size="sm" className={classes.LocationIcon}/> {props.location}</p>
                        </div>
                        <div className={classes.JobListItemMainInfo}>
                            <Bubble color="1">
                                ${props.compensation}
                            </Bubble>
                            <Bubble color="2">
                                {props.type}
                            </Bubble>
                        </div>
                    </div>
                    
                    <p className={classes.Content}>
                        {props.description.substr(1, 200)}...
                    </p>
                    <div className={classes.JobListItemFooter}>
                        <Icon icon="heart" size="lg" className={classes.LikeIcon}/>
                    </div>
            </Card>
       
    );
};

export default jobListItem;