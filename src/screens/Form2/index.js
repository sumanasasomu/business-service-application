import React from 'react';
import { TextField } from '@material-ui/core';
import MyCheckbox from '../../components/checkBox'
import MyForm from '../../components/MyForm';
import axios from 'axios';
import "./Styles.css"
import { actions } from 'reducers/store1';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { themeColors } from 'utils/constants';
import appolo from '../../assets/appolo.jpg'

function mapStateToProps(state) {
  return state
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const Form2 = (props) => {
  console.log("props from Form2", props)
  const [state, setState] = React.useState({
    alignment: true,
    tyres: false,
    balancing: false
  });
  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const handleCheckboxChange = (event) => {
    console.log("Handle checkbox change")
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const onSubmitForm = () => {
    props.actions.writeForm2Responses(state)
    axios.get('http://127.0.0.1:5000/api/hello')
        .then(response => console.log("Response is ", response.data));
    axios.post('http://127.0.0.1:5000/api/hola', state).then(response => {
      props.actions.updateAskForModel(response.data.result);
      console.log("Response is ", response.data.result)
      window.location.href = "/"
    })
  }
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
  const s = {
    containerStyle: {
      backgroundColor: 'pink'
    },
    textInputFieldStyle: { margin: 8, width: 500 },
    dateInputFieldStyle: { margin: 8, marginTop: 16, width: 500 },
    checkboxFieldStyle: { marginBottom: 4, width: 500 },
    sendButton: { margin: 16, backgroundColor: themeColors.apollo, color: themeColors.white},
    checkboxWrapper: {
      display: "flex",
      flexDirection: "column",
      margin: 8
    }
  }
  const fields = [
    {
      elements: [{
        component: TextField,
        type: 'text-field',
        name: 'customer-name',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "customer-name",
        label: "Customer name",
        otherProps: {
          required: true,
          variant: "outlined"  
        }
      },
      {
        component: TextField,
        type: 'text-field',
        name: 'customer-phone',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "customer-phone",
        label: "Customer phone",
        otherProps: {
          required: true,
          variant: "outlined"  
        }
      },
      {
        component: TextField,
        type: 'text-field',
        name: 'customer-email',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "customer-email",
        label: "Customer email",
        otherProps: {
          required: true,
          variant: "outlined"  
        }
      },
      {
        component: TextField,
        type: 'text-field',
        name: 'vehicle-number',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "vehicle-number",
        label: "Vehicle number",
        otherProps: {
          variant: "outlined"  
        }
      },
      {
        component: TextField,
        type: 'text-field',
        name: 'dateAndTime',
        onChange: handleInputChange, 
        id: "datetime-customer",
        label: "Purchase or Service Date and Time",
        style: s.dateInputFieldStyle,
        otherProps: {
          type: "datetime-local",
          defaultValue: getCurrentDateAndTime(),
          required: true,
          variant: "outlined" ,
          InputLabelProps: {
            shrink: true,
          }
        }
      }]
    },
    {
      wrapperStyle: s.checkboxWrapper,
      elements: [
        {
          component: MyCheckbox,
          type: 'check-box',
          name: 'alignment',
          style: s.checkboxFieldStyle,
          id: "alignment",
          label: "Alignment",
          otherProps: {
            isChecked: state.alignment || false,
            handleCheckboxChange: handleCheckboxChange
          }
        },
        {
          component: MyCheckbox,
          type: 'check-box',
          name: 'tyres',
          style: s.checkboxFieldStyle,
          label: "Tyres",
          otherProps: {
            isChecked: state.tyres || false,
            handleCheckboxChange: handleCheckboxChange
          }
        },
        {
          component: MyCheckbox,
          type: 'check-box',
          name: 'balancing',
          handleCheckboxChange: handleCheckboxChange, 
          style: s.checkboxFieldStyle,
          id: "balancing",
          label: "Balancing",
          otherProps: {
            isChecked: state.balancing || false,
            handleCheckboxChange: handleCheckboxChange
          }
        }
      ]
    }
  ]

  const buttons = [
    {
      variant: "contained",
      // color: "primary",
      style: s.sendButton,
      onClick: onSubmitForm,
      text: "Next"
    }
  ]

  return (
    <>
      <div className={"form-page"}>
        {/* <img className={"logo-image"} height={200} src={appolo} alt={"company-logo"}/> */}
        {/* <div className={"page-title"}>{COMPANY_NAME}</div> */}
        <MyForm containerStyle={s.containerStyle} onSubmitForm={onSubmitForm} fields={fields} buttons={buttons}/>
      </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Form2)