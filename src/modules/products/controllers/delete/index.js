import logger from '../../../../shared/config/logger/index.js'
import { ExpressAPI } from '../../../../shared/config/wrappers/ExpressAPIWrapper.js'
import parseRequest from '../../../../shared/utils/parseRequest.js'
import { ProductUseCase } from '../../use-case/ProductUseCase.js'

const deleteProduct = async (request, _response) => {
  const { path_parameters } = parseRequest(request)

  logger.info({
    message: 'Request delete product',
    data: {
      product_id: path_parameters.id,
    },
  })

  const productUseCase = new ProductUseCase()
  const product = await productUseCase.deleteProduct(path_parameters.id)

  logger.info({
    message: 'Finished request delete product',
    data: {
      product_id: path_parameters.id,
    },
  })

  return product
}

const expressAPI = new ExpressAPI()
const deleteProductController = expressAPI.wrapper(deleteProduct)

export { deleteProductController }
