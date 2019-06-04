import React, {useState} from 'react';
import axios from 'axios';

// import classes from './SearchForm.module.scss';
import InputField from '../../UI/InputField/InputField.js';
import Button from '../../UI/Button/Button.js';

const searchForm = props => {
  const [searchTerms, setSearchTerms] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const submitFormHandler = (e) => {
    e.preventDefault();
    const formData = {searchTerms, searchLocation};

    axios.post('http://google.com',formData);
  };

  return(
      <form className="SearchForm">
          <InputField type="text" placeholder="Job Title, Keywords, or Company Name" rounded centerPlaceholder icon="search" value={searchTerms} change={setSearchTerms}/>
          <InputField type="text" placeholder="Location" rounded centerPlaceholder icon="map-marker-alt"value={searchLocation} change={setSearchLocation}/>
          <Button className="SearchButton" click={submitFormHandler}>Search</Button>
          <style jsx>{`
            .SearchForm {
              width: 100%;
              max-width: 400px;
            }

            .SearchButton {
              margin-top: 30px;
            }
          `}</style>
      </form>
  );
};

export default searchForm;