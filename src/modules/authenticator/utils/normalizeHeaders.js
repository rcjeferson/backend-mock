const normalizeHeaders = (headers = {}) => Object
  .keys(headers)
  .reduce((acc, header) => ({
    ...acc,
    [header.toLocaleLowerCase()]: headers[header],
  }), {})

export { normalizeHeaders }
