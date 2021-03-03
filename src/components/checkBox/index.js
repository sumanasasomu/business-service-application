import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "./Styles.css"

export default function MyCheckbox(props) {
  return (
    <FormControlLabel
      className={"checkbox-label"}
      control={
        <Checkbox
          className={props.className}
          name={props.name}
          checked={props.isChecked}
          onChange={props.handleCheckboxChange}
          color="primary"
        />
      }
      label={props.label}
    />
  )
}