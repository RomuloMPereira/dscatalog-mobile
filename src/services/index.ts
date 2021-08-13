import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: "https://romulo-dscatalog-bootcamp.herokuapp.com",
});


export async function userToken() {
    const token = await AsyncStorage.getItem("@token");
    return token;
}

//Backend requests

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

export async function deleteProduct(id: number) {
    const authToken = await userToken();
    const response = api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
}