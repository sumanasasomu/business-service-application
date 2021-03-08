import React, { useEffect } from 'react';
import MyCheckbox from '../../components/checkBox'
import MyForm from '../../components/MyForm';
import axios from 'axios';
import { actions } from 'reducers/store1';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { backgroundImage, themeColors } from 'utils/constants';
import appolo from '../../assets/appolo.jpg'
import { useHistory } from 'react-router-dom';
import "./Styles.css"
import { MyTextField } from 'components/TextField';

function mapStateToProps(state) {
  return state
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const Form1 = (props) => {
  let history = useHistory();

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

  const [state, setState] = React.useState({
    alignment: true,
    balancing: false,
    tyres: false,
    timestamp: getCurrentDateAndTime()
  });

  const [errors, setErrors] = React.useState({})
  const [validateErrors, setValidateErrors] = React.useState(false)

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    validate('customer-name')
  }, [state['customer-name']])

  useEffect(() => {
    validate('customer-phone')
  }, [state['customer-phone']])

  useEffect(() => {
    validate('vehicle-number')
  }, [state['vehicle-number']])

  const validate = (field) => {
    if (field && validateErrors) {
      const prevState = errors;
      setErrors(({...prevState, [field]: !state?.[field]}))
    }
    else if(!field){
      const nameError = !state?.['customer-name'];
      const phoneError = !state?.['customer-phone'];
      const vehicleNumber = !state?.['vehicle-number'];
      const errorStates = {
        'customer-name': nameError,
        'customer-phone': phoneError,
        'vehicle-number': vehicleNumber
      }
      const isFormValid = !(nameError || phoneError || vehicleNumber)
      setErrors(errorStates)
      return isFormValid
    }
  }
  const onSubmitForm = (e) => {
    e.stopPropagation();
    setValidateErrors(true)
    const isFormValid = validate();
    if(isFormValid){
      const services = `${Number(state.alignment)}${Number(state.balancing)}${Number(state.tyres)}`
      const reqMsg = {
        customerName: state?.['customer-name'],
        customerPhone: state?.['customer-phone'],
        customerEmail: state?.['customer-email'],
        vehicleNumber: state?.['vehicle-number'],
        vehicleModel: state?.['vehicle-model'],
        date: state?.['timestamp'],
        services: services
      }
      console.log("Reqmsg", reqMsg)
      axios.post('http://127.0.0.1:5002/api/customer', reqMsg).then(response => {
        if(response.data.result === 'success' ){
          history.push(`/form2/${services}`)
        }
        else {
          alert(`Failed to proceed :( Please check the entries.`)
        }
      }).catch((error) => {
        alert(`Failed to proceed :( Please check the entries. \n${error}`)
      })
    }
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
        component: MyTextField,
        type: 'text-field',
        name: 'customer-name',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "customer-name",
        label: "Customer name",
        otherProps: {
          required: true,
          variant: "outlined",
          error: errors?.['customer-name'],
        }
      },
      {
        component: MyTextField,
        type: 'text-field',
        name: 'customer-phone',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "customer-phone",
        label: "Customer phone",
        otherProps: {
          required: true,
          variant: "outlined",
          error: errors['customer-phone'],
        }
      },
      {
        component: MyTextField,
        type: 'text-field',
        name: 'customer-email',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "customer-email",
        label: "Customer email",
        otherProps: {
          variant: "outlined"
        }
      },
      {
        component: MyTextField,
        type: 'text-field',
        name: 'vehicle-number',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "vehicle-number",
        label: "Vehicle number",
        otherProps: {
          required: true,
          variant: "outlined",
          error:  errors['vehicle-number'],
        }
      },
      {
        component: MyTextField,
        type: 'text-field',
        name: 'vehicle-model',
        onChange: handleInputChange,
        style: s.textInputFieldStyle,
        id: "vehicle-model",
        label: "Vehicle model",
        otherProps: {
          variant: "outlined"  
        }
      },
      {
        component: MyTextField,
        type: 'text-field',
        name: 'timestamp',
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
          name: 'balancing',
          handleCheckboxChange: handleCheckboxChange, 
          style: s.checkboxFieldStyle,
          id: "balancing",
          label: "Balancing",
          otherProps: {
            isChecked: state.balancing || false,
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
        }
      ]
    }
  ]

  const buttons = [
    {
      variant: "contained",
      style: s.sendButton,
      onClick: onSubmitForm,
      text: "Next"
    }
  ]

  return (
    <>
      <div className={"form-page"}>
        <img className={"background-image"} src={backgroundImage}/>
        <img className={"logo-image"} height={200} src={appolo} alt={"company-logo"}/>
        <MyForm containerStyle={s.containerStyle} onSubmitForm={onSubmitForm} fields={fields} buttons={buttons}/>
      </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Form1)
