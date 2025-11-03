import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;
const api = {
    updateResume: async (id, data) => {
        return await axios.put(`${base_url}/${id}`, data);
    },
    deleteResume: async (id) => {
        return await axios.delete(`${base_url}/${id}`);
    },
    getResume: async (id) => {
        return await axios.get(`${base_url}/${id}`)
    },
    addResume: async (data) => {
        return await axios.post(`${base_url}`, data);
    },
    getAllResume: async () => {
        return await axios.get(`${base_url}`)
    }
};

export default api;