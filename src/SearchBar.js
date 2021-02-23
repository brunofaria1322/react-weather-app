import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { useQuery } from "react-query";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  label: {
    marginBottom: 20,
    backgroundColor: "white"
  }
});

function SearchBar(props) {
  const [input, setInput] = useState("");
  const classes = useStyles();

  const { data, isLoading, isError, error } = useQuery(
    ["getLocationInfo", input],
    () => {
      if (input) {
        return axios
          .get(
            `http://localhost:8010/proxy/api/location/search/?query=${input}`
          )
          .then(({ data } = {}) => data);
      } else return [];
    }
  );

  return (
    <Autocomplete
      id="combo-box-demo"
      fullWidth
      options={!isLoading ? data : []}
      getOptionLabel={option => option.title}
      renderInput={params => (
        <TextField
          {...params}
          label="Select a Location"
          variant="filled"
          onChange={(event, value) => setInput(event.target.value)}
        />
      )}
      onChange={(event, value) => props.onChange(value)}
      className={classes.label}
    />
  );
}
export default SearchBar;