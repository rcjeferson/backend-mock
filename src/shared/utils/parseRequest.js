export default (event) => ({
  body: event.body && typeof (event.body) === 'string'
    ? JSON.parse(event.body)
    : event.body || {},
  path_parameters: event?.params || event?.pathParameters || {},
  query_parameters: event?.query || event?.queryStringParameters || {},
  request_id: event.requestContext?.requestId,
})
