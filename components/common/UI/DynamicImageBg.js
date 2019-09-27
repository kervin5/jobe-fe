import React, { useState, useEffect } from "react";
import variables from "../globalVariables";
import { randomInt } from "../../../lib/random";
import axios from "axios";

const DynamicImageBg = props => {
  const [imgUrl, setImgUrl] = useState("");
  const bgNumber = randomInt(1, 4);

  useEffect(() => {
    if (props.query !== "") {
      axios
        .get(
          `https://api.unsplash.com/photos/search?client_id=6b3443da3cd476fda43efed0e145250702d95e2f6372309d511825442fc7c646&query=${props.query}&orientation=landscape`
        )
        .then(res => {
          setImgUrl(
            res.data.length > 0
              ? res.data[randomInt(0, res.data.length - 1)].urls.regular
              : ""
          );
        });
    }
  }, [props.query]);

  return (
    <div className={"DynamicImageBg "}>
      <div className={"ImgContainer"}></div>
      <div className={"Content"}>{props.children}</div>

      <style jsx>{`
            .DynamicImageBg {
                width: 100%;               
                height: 100%;
                position: relative;
                background-color: ${variables.accentColor1}
            }

            .ImgContainer {
                background-image: url('${imgUrl}');
                width: 100%;
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                z-index: 4;
                transition: 300ms;
            }

            .Content {
                z-index: 5;
                position: ${props.absolute ? "absolute" : "relative"};
            }

            @media(max-width: ${variables.mediumScreen}) {
              .ImgContainer {
                  
                    filter: blur(${props.noblur ? "0px" : "4px"});
                  
                }
            }
        `}</style>
    </div>
  );
};

export default React.memo(DynamicImageBg);
