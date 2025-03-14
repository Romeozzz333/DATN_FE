import authorizeAxiosInstance from '../hooks/authorizeAxiosInstance';

const postCreateBillDetailByEmployee = async (codeBill, idProduct) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/createBillDetailByEmployee?codeBill=${codeBill}`, idProduct)
    return response;
};
const postUpdateBillDetailByEmployee = async (codeBill, idProduct) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/updateBillAndCreateBillDetailByIdBill?codeBill=${codeBill}`, idProduct)
    return response;
};
const findBillDetailByEmployeeByCodeBill = async (codeBill) => {
    const response = await authorizeAxiosInstance.get(`/billDetailByEmployee/detail?codeBill=${encodeURIComponent(codeBill)}`)
    return response;
};

const plusBillDetailByQuang = async (codeBill, idBillDetail, idProduct) => {
    const response = await authorizeAxiosInstance.post(`/bill-detail/plusBillDetail?codeBill=${encodeURIComponent(codeBill)}&idBillDetail=${encodeURIComponent(idBillDetail)}&idProduct=${encodeURIComponent(idProduct)}`)
    return response;
};

const subtractBillDetailByQuang = async (codeBill, idBillDetail, idProduct) => {
    const response = await authorizeAxiosInstance.post(`/bill-detail/subtractBillDetail?codeBill=${encodeURIComponent(codeBill)}&idBillDetail=${encodeURIComponent(idBillDetail)}&idProduct=${encodeURIComponent(idProduct)}`)
    return response;
};

const deleteBillDetailByQuang = async (codeBill, idBillDetail, idProduct) => {
    const response = await authorizeAxiosInstance.delete(`/bill-detail/deleteBillDetail?codeBill=${encodeURIComponent(codeBill)}&idBillDetail=${encodeURIComponent(idBillDetail)}&idProduct=${encodeURIComponent(idProduct)}`)
    return response;
};

const plusBillDetail = async (idBillDetail, idProduct) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/plusBillDetail?idBillDetail=${encodeURIComponent(idBillDetail)}&idProduct=${encodeURIComponent(idProduct)}`)
    return response;
};
const subtractBillDetail = async (idBillDetail, idProduct) => {
    const response = await authorizeAxiosInstance.post(`/billDetailByEmployee/subtractBillDetail?idBillDetail=${encodeURIComponent(idBillDetail)}&idProduct=${encodeURIComponent(idProduct)}`)
    return response;
};
const deleteBillDetail = async (idBillDetail, idProduct) => {
    const response = await authorizeAxiosInstance.delete(`/billDetailByEmployee/deleteBillDetail?idBillDetail=${encodeURIComponent(idBillDetail)}&idProduct=${encodeURIComponent(idProduct)}`)
    return response;
};
export { plusBillDetail, subtractBillDetail, deleteBillDetail, postCreateBillDetailByEmployee, findBillDetailByEmployeeByCodeBill, postUpdateBillDetailByEmployee, plusBillDetailByQuang, deleteBillDetailByQuang, subtractBillDetailByQuang };
