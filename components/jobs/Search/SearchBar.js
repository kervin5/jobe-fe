import Icon from "../../common/UI/Icon";
import variables from "../../common/globalVariables";
import PropTypes from "prop-types";

const SearchBar = ({ terms, location, onClick }) => {
  const shortLocationName = location.split(",")[0];

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
      <Icon icon="search" />
      <style jsx>{`
        h3 {
          text-align: center;
          display: "inline-block";
        }

        div {
          background-color: ${variables.clearColor};
          padding: 10px 15px;
          border-radius: 50px;
          border: 1px solid ${variables.mutedColor2};
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          margin-top: 10px;
        }

        .connector {
          font-weight: 300;
        }

        .location {
          color: ${variables.accentColor1};
        }

        div :global(svg) {
          max-width: 18px;
          color: ${variables.darkColor};
        }
      `}</style>
    </div>
  );
};

SearchBar.propTypes = {
  terms: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default SearchBar;
