import axios from 'axios';
import { userToken } from './auth';

export const api = axios.create({
    baseURL: "https://romulo-dscatalog-bootcamp.herokuapp.com",
});

export const TOKEN = 'Basic Ym9vdGNhbXBkZXZzdXBlcmlvcmRzY2F0YWxvZzpkc2NhdGFsb2cxOTEwMTk4OA==';

export function getProducts() {
    const response = api.get(`/products?direction=DESC&orderBy=name`);
    return response;
}

export function getCategories() {
    const response = api.get(`/categories?direction=ASC&orderBy=name`);
    return response;
}

export async function createProduct(data: object) {
    const authToken = await userToken();
    const response = api.post(`/products`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return response;
}