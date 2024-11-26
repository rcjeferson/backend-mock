const removeBearer = (token) => token.replace(/^(Bearer)\s+/, '')

export { removeBearer }
