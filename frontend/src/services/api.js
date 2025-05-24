import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL de base du backend Laravel
});

// Ajoute le token à chaque requête si présent
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getCategories = () => api.get('/categories');
export const addCategorie = (data) => api.post('/categories', data);
export const updateCategorie = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategorie = (id) => api.delete(`/categories/${id}`);
export const getProduits = () => api.get('/produits');
export const getProduitById = (id) => api.get(`/produits/${id}`);
export const getProduittById = (id) => api.get(`/produitss/${id}`);

export const addProduit = (data) => api.post('/produits', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProduit = (id, data) => api.post(`/produits/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProduit = (id) => api.delete(`/produits/${id}`);

export const getAllUnites = () => api.get('/unites');
export const getUnitesByProduit = (idProduit) => api.get(`/produits/${idProduit}/unites`);
export const addUnite = (data) => api.post('/unites', data);
export const deleteUnite = (idUnite) => api.delete(`/unites/${idUnite}`);