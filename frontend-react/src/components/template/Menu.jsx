import React, { useState, useDeferredValue } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Tree from '../utils/DataTree'
import useLoadData from '../../hooks/useLoadData'

const StyledAside = styled.aside`
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: ${({ isMenuVisible }) => (isMenuVisible ? 'flex' : 'none')};
  flex-direction: column;
  flex-wrap: wrap;
  & .menu-filter {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #aaa;
  }

  & .menu-filter i {
    color: #aaa;
    margin-right: 10px;
  }

  & input {
    color: #ccc;
    font-size: 1.3rem;
    border: 0;
    outline: 0;
    width: 100%;
    background: transparent;
  }
`

export default function Menu() {
  const isMenuVisible = useSelector((state) => state.menu.isMenuVisible)
  const isUserSet = useSelector((state) => state.user.info)
  const [treeFilter, setTreeFilter] = useState('')
  const deferredTreeFilter = useDeferredValue(treeFilter)
  const [treeData] = useLoadData('/categories/tree')

  return (
    <StyledAside isMenuVisible={isMenuVisible && isUserSet}>
      <div className="menu-filter">
        <i className="fa fa-search fa-lg"></i>
        <input
          type="text"
          value={treeFilter}
          onChange={(e) => setTreeFilter(e.target.value)}
          className="filter-field"
          placeholder="Digite para filtrar..."
        />
      </div>
      <Tree data={treeData} filter={deferredTreeFilter} />
    </StyledAside>
  )
}
