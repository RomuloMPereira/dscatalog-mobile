import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import mime from 'mime';

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
    const response = await api.post(`/products`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return response;
}

export async function deleteProduct(id: number) {
    const authToken = await userToken();
    const response = await api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
}

export async function uploadImage(image: string) {
    if (!image) return;
    const authToken = await userToken();
    let data = new FormData();

    if (Platform.OS === "android") {
        const newImageUri = "file:///" + image.split("file:/").join("");
        data.append("file", {
            uri: newImageUri,
            type: mime.getType(image),
            name: image,
        });
    } else if (Platform.OS === "ios") {
        data.append("file", {
            uri: image,
            name: image,
        });
    }

    const res = await api.post(`/products/image`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
        }
    });
    return res;
}