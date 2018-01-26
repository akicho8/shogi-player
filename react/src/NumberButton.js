import React from 'react'

export const onNumClick = (number) => ({
  type: "INPUT_NUMBER",
  number,
})

const NumberButton = ({n}) => (
  <button>{n}</button>
)

export default NumberButton
