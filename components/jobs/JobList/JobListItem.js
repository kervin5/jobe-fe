import React from 'react';

// import classes from './JobListItem.module.scss';
import variables from '../../common/globalVariables';
import Bubble from '../../common/UI/Bubble';
import Icon from '../../common/UI/Icon';
import Card from '../../common/UI/Card';
import {Link} from '../../../routes';

const styles = ` background-color: ${variables.clearColor};
                margin: auto 20px 20px;
                transition: 100ms;
                animation-timing-function: ease-in;
                padding: 20px !important;
                border-radius: 15px;
                `;

const jobListItem = (props) => {
    return(
            <Card styles={styles} animate>
                    <div className="JobListItemHeader">
                        <div>
                            <Link route={"/jobs/show/"+(props.title.split(" ").join("-"))+"-"+props.id}>
                                <a>{props.title}</a>
                            </Link>
                            <p className="Location"><Icon icon="map-marker-alt" size="sm" className="LocationIcon"/> {props.location}</p>
                        </div>
                        <div className="JobListItemMainInfo">
                            <Bubble color="1">
                                ${props.compensation}
                            </Bubble>
                            <Bubble color="2">
                                {props.type}
                            </Bubble>
                        </div>
                    </div>
                    
                    <p className="Content">
                        {props.description.substr(1, 200)}...
                    </p>
                    <div className="JobListItemFooter">
                        <Icon icon="heart" size="lg" className="LikeIcon"/>
                    </div>
                    <style jsx>{`
                        a {
                            color: ${variables.darkColor};
                            font-size: 1em;
                        }

                        a:hover {
                            color: ${variables.accentColor1};
                        }

                        .JobListItemHeader {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 10px;
                        }

                        .JobListItemHeader a {
                            font-weight: bold;
                            text-decoration: none;
                        }
                
                        .JobListItemHeader .JobListItemMainInfo {
                            white-space: nowrap;
                        }

                        .Location {
                            font-size: 0.9em;
                        }
                    
                        .Content {
                            font-weight: normal;
                            font-size: 0.9em;
                            letter-spacing: 0.1em;
                        }
                    
                        .LocationIcon {
                            opacity: 0.4;
                        }
                    
                        .LikeIcon {
                            opacity: 0.4;
                        }

                        .JobListItemFooter{
                            display: flex;
                            justify-content: flex-end;
                            margin-bottom: 5px;
                        }

                        .JobListItemFooter  a {
                            font-weight: bold;
                            text-decoration: none;
                        }
                    `}</style>
            </Card> 
    );
};

export default jobListItem;