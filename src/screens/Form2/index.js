import React, { useEffect } from 'react';
import MyForm from '../../components/MyForm';
import axios from 'axios';
import { actions } from 'reducers/store1';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { backgroundImage, themeColors } from 'utils/constants';
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
    paymentMode: '2',
    totalAmount: 0,
    tyreBrand: '1',
    'tyre-quantity': '1',
  });
  const [brands, setBrands] = React.useState([])

  const getTotalAmount = (values) => {
    let total = 0;
    const tyresCost = parseFloat(values?.['price-each-tyre'] || 0 ) * parseFloat(values?.['tyre-quantity'] || 0)
    total = tyresCost + parseFloat(values?.['alignment-cost'] || 0) + parseFloat(values?.['balancing-cost'] || 0)
    return total;
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/brands').then((response) => {
      if(response.status === 200){
        setBrands(response.data)
      }     
    }).catch((error) => {
      console.log("Couldn't fetch Brandse", error)
    })
  }, [])

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
    setState({ ...state, paymentMode: event.target.value });
  };
  const handleBrandChange = (event) => {
    setState({ ...state, tyreBrand: event.target.value });
  };
  const onSubmitForm = (e) => {
    e.stopPropagation();
    const reqMsg = {
      tyreSize: state?.['tyre-size'],
      tyreQuantity: state?.['tyre-quantity'],
      priceEachTyre: state?.['price-each-tyre'],
      alignmentCost: state?.['alignment-cost'],
      balancingCost: state?.['balancing-cost'],
      paymentStatus: state?.['paymentStatus'],
      paymentMode: state?.['paymentMode'],
      paymentID: state?.['payment-id'],
      comment: state?.['comment']
    }
    axios.post('http://127.0.0.1:5000/api/hola', reqMsg).then(response => {
      alert("Submitted!")
      history.push(`/`)
    }).catch((error) => {
      alert(`Failed to submit :( Please check the entries. \n${error}`)
    })
  }
  const s = {
    containerStyle: {
      margin: 8,
      display: "flex"
    },
    marginWidth: { margin: 8, width: 500 },
    marginWidthHigh: { margin: 16, width: 500 },
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
  const brandsField = {
    component: (
      <MyDropDown
        label={"Tyre Brand"}
        value={state.tyreBrand}
        onChange={handleBrandChange}
        containerStyle={s.marginWidth}
        labelStyle={s.labelStyle}
        options={brands}
      />
    ),
    renderAsIs: true
  }
  const tyreFields = [
  {
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
      variant: "outlined",
      defaultValue: "1"
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
          containerStyle={s.marginWidth}
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
        value={state.paymentMode}
        onChange={handlePaymentMethodChange}
        containerStyle={s.marginWidth}
        labelStyle={s.labelStyle}
        options={[
          {
            value: '1',
            label: 'Card'
          },
          {
            value: "2",
            label: "Cash"
          },
          {
            value: '3',
            label: 'Cheque'
          },
          {
            value: "4",
            label: "Google pay"
          },
          {
            value: '5',
            label: 'PayTM'
          },
          {
            value: '6',
            label: 'PhonePe'
          }
        ]}
      />
    ),
    renderAsIs: true
  }
  const paymentIDField = {
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
  if(state.paymentStatus === '1' && paymentIdRequired.includes(state.paymentMode)){
    paymentFields.push(paymentIDField)
  }

  let conditionalFields = []
  if(services[2] === '1') {
    conditionalFields = conditionalFields.concat(tyreFields)
  }
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
        style={{...s.marginWidthHigh, ...s.disabledStyle}}
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
        (brands.length > 0) && brandsField,
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
        <img className={"background-image"} src={backgroundImage}/>
        <img className={"logo-image"} height={200} src={appolo} alt={"company-logo"}/>
        <MyForm containerStyle={s.containerStyle} onSubmitForm={onSubmitForm} fields={fields} buttons={buttons}/>
      </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Form2)