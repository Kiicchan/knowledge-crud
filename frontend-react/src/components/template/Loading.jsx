import React from 'react'
import LoadingGif from '../../assets/loading.gif'
import styled from 'styled-components'
const FlexContent = styled.div`
  & {
    grid-area: content;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default function Loading() {
  return (
    <FlexContent>
      <img src={LoadingGif} alt="Loading" />
    </FlexContent>
  )
}
