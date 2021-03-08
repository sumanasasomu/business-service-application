import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import MyCheckbox from '../checkBox'

import './Styles.css'

const getSection = (section, index) => {
  if(section.renderAsIs === true){
    return section.component
  }
  const _elements = section.elements.map((F, index) => {
    if(F.renderAsIs !== true){
      return <F.component key={F.id} name={F.name} onChange={F.onChange} style={F.style} id={F.id} label={F.label} {...F.otherProps}/>
    }
    else{
      return (F.component)
    }
  })
  if(section?.wrapperStyle){
    return (
      <div key={index} style={section?.wrapperStyle}>
        {_elements}
      </div>
  )}
  return (
    _elements
  )
}
const getButton = (btnProps, index) => {
  return (
    <Button key={index} {...btnProps}>
      {btnProps.text}
    </Button>
  )
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
    // fetch('http://127.0.0.1:5000/api/hello').then(resp => resp.json()).then((data) => {console.log("Date recieved", data)})
    // fetch('http://127.0.0.1:5000/api/hola', {
    //   method: 'post',
    //   body: JSON.stringify(state)
    //  });
    axios.get('http://127.0.0.1:5000/api/hello')
        .then(response => console.log("Response is ", response.data));
    axios.post('http://127.0.0.1:5000/api/hola', state);
  }
  return (
    <div className={"form-page"} method="post">
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