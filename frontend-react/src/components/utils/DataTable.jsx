import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'

const SortableTh = styled.th`
  position: relative;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};

  ${(props) => {
    if (props.onClick) {
      return `&::before {
                position: absolute;
                right: 0.75em;
                content: '\u2191';
                opacity: ${props.order === 'dsc' ? '1' : '0.25'};
            }
            &::after {
                position: absolute;
                right: 0.25em;
                content: '\u2193';
                opacity: ${props.order === 'asc' ? '1' : '0.25'};
              }`
    }
  }};
`

function DataTable({ items, fields, ...rest }) {
  const [sorting, setSorting] = useState({ key: null, order: 'asc' })
  const columns =
    fields ||
    (items[0]
      ? Object.keys(items[0]).map((key) => ({
          key,
          label: key,
          sortable: true,
        }))
      : [])

  const handleSortingChange = (key) => {
    setSorting({
      key,
      order: key === sorting.key && sorting.order === 'asc' ? 'dsc' : 'asc',
    })
  }

  const sortedItems = () => {
    let sorted = [...items]
    const sortField = sorting.key
    const sortOrder = sorting.order
    if (sortField) {
      sorted.sort((a, b) => {
        if (a[sortField] == null) return 1
        if (b[sortField] == null) return -1
        if (a[sortField] == null && b[sortField] == null) return 0
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        )
      })
    }
    return sorted
  }

  return (
    <Table {...rest}>
      <thead>
        <tr>
          {columns.map((field) => {
            return (
              <SortableTh
                key={field.key}
                onClick={
                  field.sortable ? () => handleSortingChange(field.key) : null
                }
                order={field.key === sorting.key ? sorting.order : 'none'}>
                {field.label}
              </SortableTh>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {sortedItems().map((item, index) => {
          return (
            <tr key={index}>
              {columns.map((field) => {
                const dataShow = field.formatter?.(item) || item[field.key]
                return <td key={field.key}>{dataShow}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

DataTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      formatter: PropTypes.func,
    }).isRequired
  ),
}

export default React.memo(DataTable)
