import axios from 'axios';

export const api = axios.create({
    baseURL: "https://romulo-dscatalog-bootcamp.herokuapp.com",
});

export const TOKEN = 'Basic Ym9vdGNhbXBkZXZzdXBlcmlvcmRzY2F0YWxvZzpkc2NhdGFsb2cxOTEwMTk4OA==';