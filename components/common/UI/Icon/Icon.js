import React from 'react';

// import classes from './Icon.modules.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const icon = (props) => (
      <FontAwesomeIcon icon={["fa", props.icon]} className={(props.className || "")} size={props.size ||"lg"} onClick={props.click}/>    
)

export default icon;