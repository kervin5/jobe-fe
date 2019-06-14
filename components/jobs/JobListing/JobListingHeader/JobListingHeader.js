import React from 'react';
import variables from '../../../../components/common/globalVariables';
// import classes from './JobListingHeader.modules.scss';
import Bubble from '../../../common/UI/Bubble';
import Icon from '../../../common/UI/Icon';
import Title from '../../../common/UI/Title';


const jobListingTitleStyles = `color: ${variables.clearColor};`;
const JobListingLocationStyles = `color: ${variables.clearColor}; opacity: 0.7;`;

// const [ addToFavorite, setAddToFavorite] = useState(false);

// const setFavoriteHandler = () => {

//     setAddToFavorite(true);
// }

const header = (props) => (
    <div className="header" >
        <Title size={'l'} styles={jobListingTitleStyles}>{props.title}</Title>
        <Title size={"m"} styles={JobListingLocationStyles} weight="400"><Icon icon="map-marker-alt"/> {props.location}</Title>

        <div className="JobListingHeaderBar">
            <div className="JobListingJobType">
                <Bubble color="1">${props.minAmount}-{props.maxAmount}</Bubble>
                <Bubble color="3">{props.type}</Bubble>
            </div>
            <Icon icon="heart" color="white" float="right"  />
        </div>
        <style jsx>{`
            .header {
                width: 100%;
                max-width: 1200px;
                padding: 50px 40px;
                background-color: ${variables.accentColor2};
                border-top-right-radius: ${variables.roundedRadius};
                border-top-left-radius: ${variables.roundedRadius};
                z-index: 800;
            }

            .JobListingHeaderBar {
                display: flex;
                justify-content: space-between;
              }

              @media only screen and (max-width: 520px){

                .header {
                    width: 100%;
                    padding: 40px 40px;
                    border-top-right-radius: 0px;
                    border-top-left-radius: 0px;
                }
              
                .header p{
                      padding-bottom: 30px;
                    }
              }

        `}</style>
    </div>
)

export default header;