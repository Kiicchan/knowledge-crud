import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
`

export default function Footer() {
  return (
    <StyledFooter>
      <span>
        Knowledge - Copyright <strong>Cod3r</strong> - Cloned with React
      </span>
    </StyledFooter>
  )
}
