import React from 'react';
import classes from './SearchForm.module.scss';
import InputField from '../../UI/InputField/InputField.js';
import Button from '../../UI/Button/Button.js';

const searchForm = props => {
  return(
      <form className={classes.SearchForm}>
          <InputField type="text" placeholder="Job Title, Keywords, or Company Name" rounded centerPlaceholder icon="search"/>
          <InputField type="text" placeholder="Location" rounded centerPlaceholder icon="map-marker-alt"/>
          <Button className={classes.SearchButton}>Search</Button>
      </form>
  );
};

export default searchForm;