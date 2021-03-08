import React, { useEffect } from 'react';
import MyForm from '../../components/MyForm';
import axios from 'axios';
import { actions } from 'reducers/store1';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { themeColors } from 'utils/constants';
import appolo from '../../assets/appolo.jpg'
import MyRadioButtons from 'components/RadioButton';
import { useHistory, useParams } from 'react-router-dom';
import "./Styles.css"
import MyDropDown from 'components/DropDown';
import { MyTextField } from 'components/TextField';

function mapStateToProps(state) {
  return state
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
const Form2 = (props) => {
  let history = useHistory();
  const { services } = useParams();
  const [state, setState] = React.useState({
    paymentStatus: '0',
    paymentMethod: 'cash',
    totalAmount: 0
  });

  const getTotalAmount = (values) => {
    console.log("CALCULATING....")
    let total = 0;
    const tyresCost = parseInt(values?.['price-each-tyre'] || 0 ) * parseInt(values?.['tyre-quantity'] || 0)
    total = tyresCost + parseInt(values?.['alignment-cost'] || 0) + parseInt(values?.['balancing-cost'] || 0)
    console.log("Total is ", total)
    return total;
  }

  useEffect(() => {
    const totalAmt = getTotalAmount(state)
    setState((prevState) => ({...prevState, totalAmount: totalAmt}))
  }, [state['alignment-cost'], state['balancing-cost'], state['tyre-quantity'], state['price-each-tyre']])

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const handlePaymentStatusChange = (event) => {
    setState({ ...state, paymentStatus: event.target.value });
  };
  const handlePaymentMethodChange = (event) => {
    setState({ ...state, paymentMethod: event.target.value });
  };
  const onSubmitForm = (e) => {
    e.stopPropagation();
    props.actions.writeForm1Responses(state)
    console.log("Writing form1 responses", props.form1Responses)
    axios.get('http://127.0.0.1:5000/api/hello')
        .then(response => console.log("Response is ", response.data));
    axios.post('http://127.0.0.1:5000/api/hola', state).then(response => {
      alert("Submitted!")
      history.push(`/`)
    }).catch(() => {
      alert("Failed to submit :( Please check the entries.")
    })
  }
  const s = {
    containerStyle: {
      margin: 8,
      display: "flex"
    },
    textInputFieldStyle: { margin: 8, width: 500 },
    dateInputFieldStyle: { margin: 8, marginTop: 16, width: 500 },
    checkboxFieldStyle: { marginBottom: 4, width: 500 },
    sendButton: { margin: 16, backgroundColor: themeColors.apollo, color: themeColors.white},
    checkboxWrapper: {
      display: "flex",
      flexDirection: "column",
      margin: 8
    },
    labelStyle: {
      textAlign: 'start',
      color: themeColors.primary
    },
    groupStyle: {
      display: "flex",
      flexDirection: "row"
    },
    listStyle: {
      borderColor: themeColors.primary
    },
    disabledStyle: {
      backgroundColor: themeColors.tertiary
    }
  }
  const commonFields = [{
    component: MyTextField,
    type: 'text-field',
    name: 'tyre-size',
    onChange: handleInputChange, 
    style: s.textInputFieldStyle,
    id: "tyre-size",
    label: "Tyre size",
    otherProps: {
      required: true,
      variant: "outlined"  
    }
  },
  {
    component: MyTextField,
    type: 'text-field',
    name: 'tyre-quantity',
    onChange: handleInputChange, 
    style: s.textInputFieldStyle,
    id: "tyre-quantity",
    label: "Tyre quantity",
    otherProps: {
      required: true,
      variant: "outlined"  
    }
  },
  {
    component: MyTextField,
    type: 'text-field',
    name: 'price-each-tyre',
    onChange: handleInputChange, 
    style: s.textInputFieldStyle,
    id: 'price-each-tyre',
    label: "Price single tyre",
    otherProps: {
      required: true,
      variant: "outlined"  
    }
  }]

  let paymentFields = [
    {
      component: (
        <MyRadioButtons
          formLabel={'Payment done?'}
          name={"payment-status"}
          value={state.paymentStatus}
          onChange={handlePaymentStatusChange}
          containerStyle={s.containerStyle}
          labelStyle={s.labelStyle}
          groupStyle={s.groupStyle}
          radios={[
            {
              value: '1',
              label: 'Yes'
            },
            {
              value: '0',
              label: 'NO'
            }
          ]}
        />
      ),
      renderAsIs: true
    }
  ]
  const paymentMethod = {
    component: (
      <MyDropDown
        label={"Payment method"}
        value={state.paymentMethod}
        onChange={handlePaymentMethodChange}
        containerStyle={s.containerStyle}
        labelStyle={s.labelStyle}
        options={[
          {
            value: "cash",
            label: "Cash"
          },
          {
            value: "gpay",
            label: "Google pay"
          },
          {
            value: 'phonepe',
            label: 'PhonePe'
          },
          {
            value: 'paytm',
            label: 'PayTM'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'cheque',
            label: 'Cheque'
          }
        ]}
      />
    ),
    renderAsIs: true
  }
  const paymentID = {
    component: MyTextField,
    type: 'text-field',
    name: 'payment-id',
    onChange: handleInputChange, 
    style: s.textInputFieldStyle,
    id: 'payment-id',
    label: "Payment ID",
    otherProps: {
      required: true,
      variant: "outlined"  
    }
  }
  const paymentIdRequired = ['gpay', 'phonepe', 'card', 'paytm']

  if(state.paymentStatus === '1'){
    paymentFields.push(paymentMethod)
  }
  if(state.paymentStatus === '1' && paymentIdRequired.includes(state.paymentMethod)){
    paymentFields.push(paymentID)
  }

  let conditionalFields = []
  if(services[0] === '1') {
    conditionalFields.push({
      component: MyTextField,
      type: 'text-field',
      name: 'alignment-cost',
      onChange: handleInputChange, 
      style: s.textInputFieldStyle,
      id: 'alignment-cost',
      label: "Alignment cost",
      otherProps: {
        required: true,
        variant: "outlined"  
      }
    })
  }
  if(services[1] === '1') {
    conditionalFields.push({
      component: MyTextField,
      type: 'text-field',
      name: 'balancing-cost',
      onChange: handleInputChange, 
      style: s.textInputFieldStyle,
      id: 'balancing-cost',
      label: "Balancing cost",
      otherProps: {
        required: true,
        variant: "outlined"  
      }
    })
  }
  const totalAmount = getTotalAmount(state) || 0
  const totalAmountField = {
    component: (
      <MyTextField
        id={"toatl-amount"}
        label={"Total Amount"}
        style={{...s.textInputFieldStyle, ...s.disabledStyle}}
        variant={"outlined"}
        value={`Rs. ${totalAmount}/-`}
        InputProps={{
          readOnly: true,
        }}
      />
    ),
    renderAsIs: true  
  }
  const fields = [
    {
      elements: [
        ...commonFields,
        ...conditionalFields,
        ...paymentFields,
        totalAmountField
      ]
    }
  ]

  const buttons = [
    {
      variant: "contained",
      style: s.sendButton,
      onClick: onSubmitForm,
      text: "SUBMIT"
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

export default connect(mapStateToProps, mapDispatchToProps)(Form2)