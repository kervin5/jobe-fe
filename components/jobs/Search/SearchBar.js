import Icon from "@/common/UI/Icon";
import PropTypes from "prop-types";
import styled from "styled-components";
import appText from "@/lang/appText";

const StyledSearchBar = styled.div`
  background-color: ${(props) => props.theme.clearColor};
  padding: 10px 15px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.mutedColor2};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 10px;
  position: relative;

  h3 {
    text-align: center;
    margin-bottom: 0;
  }

  .searchTerms {
    text-transform: capitalize;
  }

  .connector {
    font-weight: 300;
  }

  .location {
    color: ${(props) => props.theme.accentColor1};
  }

  .SearchIcon {
    position: absolute;
    top: 10px;
    right: 15px;

    .Icon svg {
      max-width: 18px;
      color: ${(props) => props.theme.darkColor};
      margin-left: 10px;
    }
  }
`;

const SearchBar = ({
  terms = appText.adjectives.awesome,
  location,
  onClick,
}) => {
  const shortLocationName = location
    ? location.split(",")[0]
    : `${appText.pronouns.your} ${appText.objects.area.singular}`;

  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledSearchBar onClick={clickHandler}>
      <h3>
        <span className="searchTerms">{terms}</span>{" "}
        <span className="connector">{`${appText.objects.job.plural} ${appText.adjectives.near}`}</span>{" "}
        <span className="location">{shortLocationName}</span>
      </h3>
      <span className="SearchIcon">
        <Icon icon="search" />
      </span>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  terms: PropTypes.string,
  location: PropTypes.string,
};

export default SearchBar;
