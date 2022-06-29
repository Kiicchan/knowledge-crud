import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

function DataSelect({ items, value, defaultText, ...otherProps }) {
  const options = items || []
  return (
    <Form.Select value={value || ''} {...otherProps}>
      <option value={''}>{defaultText}</option>
      {options.map((item, index) => {
        return (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        )
      })}
    </Form.Select>
  )
}

DataSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.any,
  defaultText: PropTypes.string,
}

export default React.memo(DataSelect)
