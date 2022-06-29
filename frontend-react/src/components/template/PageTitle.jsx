import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Title = styled.h1`
  margin: 0px;
  font-size: 2.5rem;
`

const SubTitle = styled.h2`
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
`

function PageTitle({ main, icon, sub }) {
  return (
    <div>
      <Title>
        {icon ? <i className={icon}></i> : null} {main}
      </Title>
      <SubTitle>{sub}</SubTitle>
      <hr />
    </div>
  )
}

PageTitle.propTypes = {
  main: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

export default PageTitle
