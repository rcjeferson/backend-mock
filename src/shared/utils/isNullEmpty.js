const isNullOrEmpty = (value) => {
  if (value === undefined || value === null) return true

  if (Array.isArray(value) && value.length === 0) return true

  if (typeof value === 'object' && Object.keys(value).length === 0) return true

  return false
}

export {
  isNullOrEmpty,
}
