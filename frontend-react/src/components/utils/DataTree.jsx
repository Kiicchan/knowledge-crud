import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const RecursiveLI = ({ node, level, ...otherProps }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const hasChild = node.children?.length > 0
  const forcedOpen = node.forcedOpen
  useLayoutEffect(() => {
    setIsTransitioning(true)
    const timeout = setTimeout(() => {
      setIsTransitioning(false)
    }, 200)
    return () => {
      clearTimeout(timeout)
    }
  }, [isOpen])
  return (
    <li className={`tree-node`} {...otherProps}>
      <div className="tree-content" style={{ paddingLeft: 24 * level }}>
        <i
          className={`tree-arrow ${hasChild && 'has-child'} ${
            isOpen && 'expanded'
          }`}
          onClick={() => setIsOpen((isOpen) => !isOpen)}></i>
        <Link className="tree-anchor" to={`/categories/${node.id}/articles`}>
          <span>{node.name}</span>
        </Link>
      </div>
      <ul
        className={[
          'tree-children',
          !isTransitioning && (isOpen || forcedOpen) ? '' : 'is-hidden',
          !(isOpen || forcedOpen) && !isTransitioning ? 'is-display-none' : '',
        ].join(' ')}>
        {node.children?.map((child) => {
          return (
            <RecursiveLI
              node={child}
              key={child.id}
              level={level + 1}
              {...otherProps}
            />
          )
        })}
      </ul>
    </li>
  )
}

function DataTree({ data, filter, className }) {
  const treeFilter = filter || ''.toLowerCase()
  const filteredData = data.reduce(function reducer(filtered, current) {
    const hasValue = current.name?.toLowerCase().indexOf(treeFilter) > -1
    if (hasValue) return filtered.concat([current])
    const filteredChildren = current.children?.reduce(reducer, [])
    if (filteredChildren.length > 0)
      return filtered.concat([
        { ...current, forcedOpen: true, children: filteredChildren },
      ])
    return filtered
  }, [])

  return (
    <div className={className}>
      {filteredData.length === 0 ? (
        <div className="tree-filter-empty">Categoria não encontrada</div>
      ) : (
        <ul className={'tree-root'}>
          {filteredData.map((node) => {
            return <RecursiveLI node={node} key={node.id} level={0} />
          })}
        </ul>
      )}
    </div>
  )
}

DataTree.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string,
}

export default styled(DataTree)`
  & {
    overflow: auto;
    .tree-node.selected > .tree-content,
    .tree-node .tree-content:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    span {
      color: #fff;
    }
  }
  .tree-root {
    padding: 3px;
  }
  .tree-children {
    position: relative;
    list-style: none;
    padding: 0;
    right: 0;
    transition: all 0.25s;
    &.is-hidden {
      opacity: 0;
      right: 50px;
    }
    &.is-display-none {
      display: none;
    }
  }
  .tree-node {
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    position: relative;
    /* box-sizing: border-box; */
  }

  .tree-content {
    display: flex;
    align-items: center;
    padding: 4px;
    cursor: pointer;
    width: 100%;
    /* box-sizing: border-box; */
  }

  .tree-arrow {
    flex-shrink: 0;
    height: 30px;
    cursor: pointer;
    margin-left: 30px;
    width: 0;
  }
  .tree-arrow.has-child {
    -webkit-filter: brightness(2);
    filter: brightness(2);
    margin-left: 0;
    width: 30px;
    position: relative;

    :after {
      border: 1.5px solid #494646;
      position: absolute;
      border-left: 0;
      border-top: 0;
      left: 9px;
      top: 50%;
      height: 9px;
      width: 9px;
      transform: rotate(-45deg) translateY(-50%) translateX(0);
      transition: transform 0.25s;
      transform-origin: center;
    }
  }
  .tree-arrow.expanded.has-child:after {
    transform: rotate(45deg) translateY(-50%) translateX(-5px);
  }
  .tree-anchor {
    flex-grow: 2;
    outline: none;
    display: flex;
    text-decoration: none;
    color: #343434;
    vertical-align: top;
    margin-left: 3px;
    line-height: 24px;
    padding: 3px 6px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tree-checkbox:after,
  .tree-arrow:after {
    position: absolute;
    display: block;
    content: '';
  }
  .tree-filter-empty {
    color: #ccc;
    padding: 3px;
    font-size: 1.3rem;
    margin-left: 20px;
  }
`
