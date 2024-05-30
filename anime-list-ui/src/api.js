import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/anime`

export const getAnimeCards = async (page, size = 10) => axios.get(`${BASE_URL}?page=${page}&pageSize=${size}`)

export const getAnimeCard = async (id) => axios.get(`${BASE_URL}/${id}`)

export const createAnimeCard = async (anime) => axios.post(BASE_URL, anime)

export const uploadPhoto = async (id, image) => axios.put(`${BASE_URL}/${id}/upload-image`, image, {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
})

export const updateAnimeCard = async (id, updatedAnime) => axios.put(`${BASE_URL}/${id}`, updatedAnime)

export const deleteAnimeCard = async (id) => axios.delete(`${BASE_URL}/${id}`)