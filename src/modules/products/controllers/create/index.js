import logger from '../../../../shared/config/logger/index.js'
import { ExpressAPI } from '../../../../shared/config/wrappers/ExpressAPIWrapper.js'
import parseRequest from '../../../../shared/utils/parseRequest.js'
import { ProductBasicResponse } from '../../entities/ProductResponseBasic.js'
import { validateCreateProduct } from './validate.js'
import { ProductUseCase } from '../../use-case/ProductUseCase.js'

const createProduct = async (request, _response) => {
  const { body } = parseRequest(request)
  logger.info({
    message: 'Request create product',
    data: {
      ...body,
    },
  })

  const productToCreate = validateCreateProduct(body)

  const productUseCase = new ProductUseCase()

  const productCreated = await productUseCase.create({
    ...productToCreate,
  })

  const productBasicResponse = new ProductBasicResponse(productCreated)

  logger.info({
    message: 'Finished request create product',
  })

  return productBasicResponse
}

const expressAPI = new ExpressAPI()
const createProductController = expressAPI.wrapper(createProduct)

export { createProductController }
