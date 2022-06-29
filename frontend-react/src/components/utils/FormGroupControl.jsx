import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

function FormGroupControl({
  value,
  type,
  label,
  text,
  placeholder,
  controlId,
  onChange,
  readOnly,
  required,
  ...otherProps
}) {
  return (
    <Form.Group controlId={controlId} {...otherProps}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
      />
      {text && <Form.Text className="text-muted">{text}</Form.Text>}
    </Form.Group>
  )
}

FormGroupControl.propTypes = {
  value: PropTypes.any,
  controlId: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
}

export default FormGroupControl
