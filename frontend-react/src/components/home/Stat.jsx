import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StatContainer = styled.div`
  display: flex;
  flex: 1;
  display: flex;
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`
const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  i {
    font-size: 5rem;
  }
`

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & :first-child {
    font-size: 1.2rem;
  }
  & :nth-child(2) {
    font-size: 3rem;
  }
`

function Stat({ title, icon, color, value }) {
  return (
    <StatContainer>
      <StyledIcon>
        <i className={icon} style={{ color: color || '#000' }}></i>
      </StyledIcon>
      <InfoContainer>
        <span>{title}</span>
        <span>{value}</span>
      </InfoContainer>
    </StatContainer>
  )
}

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  value: PropTypes.number,
}

export default Stat
