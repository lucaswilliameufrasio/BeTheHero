import React from 'react'
import './styles.css'

function ValidationError({ error }) {
  return (
    <span className="validationErrorMessage">{error}</span>
  ) 
}

export default ValidationError
