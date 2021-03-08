import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { themeColors } from '../../utils/constants'
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { optionProperties } from '@fluentui/utilities';

export default function MyDropDown(props) {
  const PrimaryMenu = withStyles({
    root: {
      color: themeColors.primary,
      '&:selected': {
        color: themeColors.primary,
      },
    },
    checked: {},
  })((props) => <MenuItem color="default" {...props} />);

  return (
    <FormControl style={props.containerStyle}>
      <InputLabel style={props.labelStyle} shrink id="dropdown-label">
        {props.label}
      </InputLabel>
      <Select
        value={props.value}
        onChange={props.onChange}
        displayEmpty
        >
          {props.options.map((option) => {
              return (
                <PrimaryMenu key={option.value} value={option.value}>{option.label}</PrimaryMenu>
              )
          })}
      </Select>
    </FormControl>
  )
}

