import React, { useState, useEffect } from "react";
import axios from "axios";

const DynamicImageBg = props => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (props.query !== "") {
      axios
        .get(
          `https://api.unsplash.com/photos/search?client_id=6b3443da3cd476fda43efed0e145250702d95e2f6372309d511825442fc7c646&query=${props.query}&orientation=landscape`
        )
        .then(res => {
          console.log(res.data);
          console.log(res.data);
          setImgUrl(res.data[0].urls.regular);
        });
    }
  }, [props.query]);

  return (
    <div className={"DynamicImageBg"}>
      {props.children}
      <style jsx>{`
            .DynamicImageBg {
                background-color: red;
                background-image: url('${imgUrl}');
                width: 100%;
                background-size: contain;
            }
        `}</style>
    </div>
  );
};

export default React.memo(DynamicImageBg);
