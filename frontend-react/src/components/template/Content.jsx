import React from 'react'
import styled from 'styled-components'
import MainRoutes from '../../routes/router'

const StyledDiv = styled.div`
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
`

export default function Content() {
  return (
    <StyledDiv>
      <MainRoutes />
    </StyledDiv>
  )
}
