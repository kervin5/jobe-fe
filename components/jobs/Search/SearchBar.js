import Icon from "../../common/UI/Icon";
import variables from "../../common/globalVariables";
import PropTypes from "prop-types";

const SearchBar = ({ terms = "Awesome", location, onClick }) => {
  const shortLocationName = location ? location.split(",")[0] : "Your Area";

  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div onClick={clickHandler}>
      <h3>
        {terms} <span className="connector">Jobs in</span>{" "}
        <span className="location">{shortLocationName}</span>
      </h3>
      <span className="SearchIcon">
        <Icon icon="search" />
      </span>

      <style jsx>{`
        h3 {
          text-align: center;
          margin-bottom: 0;
        }

        div {
          background-color: ${variables.clearColor};
          padding: 10px 15px;
          border-radius: 50px;
          border: 1px solid ${variables.mutedColor2};
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
          margin-top: 10px;
          position: relative;
        }

        .connector {
          font-weight: 300;
        }

        .location {
          color: ${variables.accentColor1};
        }

        .SearchIcon {
          position: absolute;
          top: 10px;
          right: 15px;
        }

        .SearchIcon :global(.Icon svg) {
          max-width: 18px;
          color: ${variables.darkColor};
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

SearchBar.propTypes = {
  terms: PropTypes.string,
  location: PropTypes.string.isRequired
};

export default SearchBar;
