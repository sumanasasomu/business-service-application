import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { themeColors } from '../../utils/constants'
import { withStyles } from '@material-ui/core/styles';
import "./Styles.css"

export default function MyCheckbox(props) {
  const PrimaryCheckBox = withStyles({
    root: {
      color: themeColors.primary,
      '&$checked': {
        color: themeColors.primary,
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  return (
    <FormControlLabel
      className={"checkbox-label"}
      control={
        <PrimaryCheckBox
          className={"checkbox-icon"}
          name={props.name}
          checked={props.isChecked}
          onChange={props.handleCheckboxChange}
          color="primary"
        />
      }
      label={props.label}
      style={props.style}
    />
  )
}