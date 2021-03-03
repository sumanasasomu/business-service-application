import React from 'react';
import { TextField } from '@material-ui/core';
import MyCheckbox from '../checkBox'
import './Styles.css'

const MyForm = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedC: false
  });
  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <form className={"home-form"} noValidate autoComplete="off">
      {/* <TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" label="Filled" variant="filled" /> */}
      <TextField className={"sumanasa"} id="customer-name" label="Customer Name" variant="outlined" />
      <TextField className={"text-input-field"} id="customer-phone" label="Customer Contact" variant="outlined" />
      <TextField className={"text-input-field"} id="customer-name" label="Customer Email" variant="outlined" />
      <TextField className={"text-input-field"} id="customer-name" label="Vehicle Number" variant="outlined" />
      <TextField className={"text-input-field"} id="customer-name" label="Vehicle Number" variant="outlined" />
      <TextField
        id="datetime-customer"
        label="Purchase or Service Date and Time"
        type="datetime-local"
        defaultValue=""
        className={"date-input-field"}
        InputLabelProps={{
          shrink: true,
        }}
      />
        {/* <MyCheckbox className={"checkbox"} label={"Alignment"} name={"alignment"} checked={state.checkedA} handleChange={handleCheckboxChange}/>
        <MyCheckbox className={"checkbox"} label={"Tyres"} name={"tyres"} checked={state.checkedA} handleChange={handleCheckboxChange}/>
        <MyCheckbox className={"checkbox"} label={"Balancing"} name={"balancing"} checked={state.checkedA} handleChange={handleCheckboxChange}/> */}
      </form>
  )
}
export default MyForm