import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Pagination from 'react-bootstrap/Pagination'

function DataPagination({ page, count, limit, onChange }) {
  const last = limit !== 0 && count !== 0 ? Math.ceil(count / limit) : 1

  useEffect(() => {
    if (page > last) {
      onChange(last)
    } else if (page < 1) {
      onChange(1)
    }
  })

  return (
    <Pagination>
      <Pagination.First onClick={() => onChange(1)} disabled={page === 1} />
      <Pagination.Prev
        onClick={() => onChange((page) => page - 1)}
        disabled={page === 1}
      />
      {Array.from({ length: last }, (v, k) => k + 1).map((toPage) => (
        <Pagination.Item
          key={toPage}
          onClick={() => onChange(toPage)}
          active={toPage === page}>
          {toPage}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => onChange((page) => page + 1)}
        disabled={page === last}
      />
      <Pagination.Last
        onClick={() => onChange(last)}
        disabled={page === last}
      />
    </Pagination>
  )
}

DataPagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default React.memo(DataPagination)
