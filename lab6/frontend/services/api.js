// src/services/api.js
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/businesses';

export const getBusinesses = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los negocios:', error);
        throw error;
    }
};
export const getBusiness = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el negocio:', error);
        throw error;
    }
};
export const createBusiness = async (business) => {
    try {
        const response = await axios.post(API_URL, business);
        return response.data;
    } catch (error) {
        console.error('Error al crear el negocio:', error);
        throw error;
    }
};
export const updateBusiness = async (id, business) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, business);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el negocio:', error);
        throw error;
    }
};
export const deleteBusiness = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el negocio:', error);
        throw error;
    }
};