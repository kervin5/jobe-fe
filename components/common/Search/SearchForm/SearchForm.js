import React, {useState} from 'react';
import axios from 'axios';
import classes from './SearchForm.module.scss';
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
      <form className={classes.SearchForm}>
          <InputField type="text" placeholder="Job Title, Keywords, or Company Name" rounded centerPlaceholder icon="search" value={searchTerms} change={setSearchTerms}/>
          <InputField type="text" placeholder="Location" rounded centerPlaceholder icon="map-marker-alt"value={searchLocation} change={setSearchLocation}/>
          <Button className={classes.SearchButton} click={submitFormHandler}>Search</Button>
      </form>
  );
};

export default searchForm;