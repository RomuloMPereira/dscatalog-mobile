import axios from 'axios';

export const api = axios.create({
    baseURL: "https://romulo-dscatalog-bootcamp.herokuapp.com",
});

export const TOKEN = 'Basic Ym9vdGNhbXBkZXZzdXBlcmlvcmRzY2F0YWxvZzpkc2NhdGFsb2cxOTEwMTk4OA==';

export function getProducts() {
    const result = api.get(`/products?page=0&linesPerPage=12&direction=ASC&orderBy=name`);
    return result;
}