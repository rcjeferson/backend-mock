import logger from '../../../../shared/config/logger/index.js'
import { ExpressAPI } from '../../../../shared/config/wrappers/ExpressAPIWrapper.js'
import parseRequest from '../../../../shared/utils/parseRequest.js'
import { ProductUseCase } from '../../use-case/ProductUseCase.js'

const listProducts = async (request, _response) => {
  const { query_parameters } = parseRequest(request)

  logger.info({
    message: 'Request list products',
    data: {
      query_parameters,
    },
  })

  const productUseCase = new ProductUseCase()
  const products = await productUseCase.list()

  logger.info({
    message: 'Finished request list products',
  })

  return { products }
}

const expressAPI = new ExpressAPI()
const listProductsController = expressAPI.wrapper(listProducts)

export { listProductsController }
