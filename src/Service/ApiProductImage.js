import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

export const findListImageByIdProductDetail = async (id) => {
    const response = await authorizeAxiosInstance.get(`/image/listProductImage?idProduct=${id}`);
    return response;
};
