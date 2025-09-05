import React from 'react'
import PropTypes from 'prop-types'
import { Chip } from '@mui/material'

const colorMap = {
  active: 'success',
  pending: 'warning',
  completed: 'default',
}

/**
 * StatusChip
 * A small reusable component that renders a Material-UI Chip for a project status.
 * - Accepts `value` (status string)
 * - Maps status -> MUI color via colorMap
 * - Uses React.memo to avoid unnecessary re-renders
 */
function StatusChip({ value }) {
  const status = String(value || '').toLowerCase()
  const color = colorMap[status] || 'default'

  // Capitalize label (e.g. "active" -> "Active")
  const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'

  return <Chip label={label} color={color} size="small" variant="outlined" />
}

StatusChip.propTypes = {
  value: PropTypes.string,
}

export default React.memo(StatusChip)
