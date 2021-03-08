import React from 'react';
import Button from '@material-ui/core/Button';

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