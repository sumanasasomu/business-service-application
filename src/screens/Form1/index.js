import React from 'react';
import MyCheckbox from '../../components/checkBox'
import MyForm from '../../components/MyForm';
import axios from 'axios';
import { actions } from 'reducers/store1';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { themeColors } from 'utils/constants';
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

  console.log("props from Form1", props)
  const [state, setState] = React.useState({
    alignment: true,
    balancing: false,
    tyres: false
  });
  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const onSubmitForm = (e) => {
    e.stopPropagation();
    const services = `${Number(state.alignment)}${Number(state.balancing)}${Number(state.tyres)}`
    props.actions.writeForm1Responses(state)
    console.log("Writing form1 responses", props.form1Responses)
    axios.get('http://127.0.0.1:5000/api/hello')
        .then(response => console.log("Response is ", response.data));
    axios.post('http://127.0.0.1:5000/api/hola', state).then(response => {
      // window.location.href = "/form2"
      history.push(`/form2/${services}`)
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
        component: MyTextField,
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
        component: MyTextField,
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
        component: MyTextField,
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
        component: MyTextField,
        type: 'text-field',
        name: 'vehicle-number',
        onChange: handleInputChange, 
        style: s.textInputFieldStyle,
        id: "vehicle-number",
        label: "Vehicle number",
        otherProps: {
          required: true,
          variant: "outlined"  
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
      // color: "primary",
      style: s.sendButton,
      onClick: onSubmitForm,
      text: "Next"
    }
  ]

  return (
    <>
      <div className={"form-page"}>
        <img className={"logo-image"} height={200} src={appolo} alt={"company-logo"}/>
        {/* <div className={"page-title"}>{COMPANY_NAME}</div> */}
        <MyForm containerStyle={s.containerStyle} onSubmitForm={onSubmitForm} fields={fields} buttons={buttons}/>
      </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Form1)
