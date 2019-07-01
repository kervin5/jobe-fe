import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import variables from "../globalVariables";

const DynamicIcon = icon => {
  return dynamic(() => import("@material-ui/icons").then(mod => mod[icon]));
};

const Icon = props => {
  const IconToRender = DynamicIcon(props.icon);

  if (props.icon) {
    return (
      <React.Fragment>
        <IconToRender />
        <style jsx global>{`
          .MuiSvgIcon-root {
            color: ${variables.accentColor1};
          }
        `}</style>
      </React.Fragment>
    );
  }

  return null;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default React.memo(Icon, (prevProps, nextProps) => {
  return prevProps.icon === nextProps.icon;
});
