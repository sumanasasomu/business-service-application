import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { themeColors } from '../../utils/constants'
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function MyRadioButtons(props) {
  const PrimaryRadio = withStyles({
    root: {
      color: themeColors.primary,
      '&$checked': {
        color: themeColors.primary,
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <FormControl component="fieldset" style={props.containerStyle}>
      <FormLabel component="legend" style={props.labelStyle}>{props.formLabel}</FormLabel>
      <RadioGroup
        aria-label={props.formLabel}
        style={props.groupStyle}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {props.radios.map((radio) => (
          <FormControlLabel key={radio.name} value={radio.value} control={radio.control ? radio.control : <PrimaryRadio />} label={radio.label} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}