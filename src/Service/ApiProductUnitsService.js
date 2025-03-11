import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';
const findProductUnitsByIdProduct = async (id) => {
    const response = await authorizeAxiosInstance.get(`/productUntis/findProductUnitsById?idProductUnits=${id}`)
    return response;

};
export {findProductUnitsByIdProduct};