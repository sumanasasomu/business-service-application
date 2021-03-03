import React from 'react';
import { useHistory } from "react-router-dom";

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import MyCheckbox from '../checkBox'

import './Styles.css'

const formStyle = {
  textInputFieldStyle: { margin: 8, width: 500 },
  dateInputFieldStyle: { margin: 16, width: 500 },
  sendButton: { margin: 32 }
}
const MyForm = (props) => {
  let history = useHistory();

  const [state, setState] = React.useState({
    alignment: true,
    tyres: false,
    balancing: false
  });
  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const getCurrentDateAndTime = () => {
    const today = new Date();
    const month = today.getMonth() + 1
    const day = today.getDate()
    const hour = today.getHours()
    const min = today.getMinutes()

    const date = `${today.getFullYear()}-${month > 9 ? '' : 0}${month}-${day > 9 ? '' : 0}${day}`; 
    const time = `${hour > 9 ? '' : 0}${hour}:${min > 9 ? '' : 0}${min}`;
    return (`${date}T${time}`)
  }

  const onSubmitForm = () => {
    console.log("The form values are:", state)
    history.push('/page2');
  }
  return (
    <div className={"form-page"}>
    <form onSubmit={onSubmitForm} className={"home-form"} noValidate autoComplete="off">
      <TextField name={'customerName'} onChange={handleInputChange} style={formStyle.textInputFieldStyle} id="customer-name" required={true} label="Customer name" variant="outlined" />
      <TextField name={'customerPhone'} onChange={handleInputChange} style={formStyle.textInputFieldStyle} id="customer-phone" required={true} label="Customer contact" variant="outlined" />
      <TextField name={'customerEmail'} onChange={handleInputChange} style={formStyle.textInputFieldStyle} id="customer-email" label="Customer email" variant="outlined" />
      <TextField name={'vehicleNumber'} onChange={handleInputChange} style={formStyle.textInputFieldStyle} id="vehicle-number" required={true} label="Vehicle number" variant="outlined" />
      <TextField
        id="datetime-customer"
        label="Purchase or Service Date and Time"
        type="datetime-local"
        name={'dateAndTime'}
        onChange={handleInputChange}
        defaultValue={getCurrentDateAndTime()}
        style={{...formStyle.textInputFieldStyle, ...formStyle.dateInputFieldStyle}}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className={"checkbox-wrapper"}>
        <MyCheckbox className={"checkbox"} label={"Alignment"} name={"alignment"} isChecked={state.alignment || false} handleCheckboxChange={handleCheckboxChange}/>
        <MyCheckbox className={"checkbox"} label={"Tyres"} name={"tyres"} isChecked={state.tyres || false} handleCheckboxChange={handleCheckboxChange}/>
        <MyCheckbox className={"checkbox"} label={"Balancing"} name={"balancing"} isChecked={state.balancing || false} handleCheckboxChange={handleCheckboxChange}/>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={"send-button"}
        style={formStyle.sendButton}
        onClick={onSubmitForm}
      >
        {"Next"}
      </Button>
      </form>
      </div>
  )
}
export default MyForm