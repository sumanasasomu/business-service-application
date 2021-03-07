import React from 'react';
import Button from '@material-ui/core/Button';

import './Styles.css'

const getSection = (section, index) => {
  const _elements = section.elements.map((f) => (
    <f.component key={f.id} name={f.name} onChange={f.onChange} style={f.style} id={f.id} label={f.label} {...f.otherProps}/>
  ))
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
  const {
    fields,
    onSubmitForm,
    buttons
  } = props;
  return (
    <>
      <form onSubmit={onSubmitForm} className={"home-form"} noValidate autoComplete="off">
        {fields.map((section, index) => getSection(section, index))}
        {buttons.map((eachBtn, index) => getButton(eachBtn, index))}
      </form>
    </>
  )
}

export default MyForm