import React from 'react';
import { themeColors } from '../../utils/constants'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, MenuItem, Select } from '@material-ui/core';

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

