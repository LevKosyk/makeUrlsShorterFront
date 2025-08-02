import axios from "axios";
import localStorage from "local-storage-fallback";

const API_URL = "http://localhost:5010";

const instance = axios.create({
  baseURL: API_URL,
});

const token = localStorage.getItem("token");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const fetchLogin = async (email, password) => {
  try {
    const response = await instance.post("/users/login", { email, password });
    const token = response.data.token;
    localStorage.setItem("token", token);
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return token;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchRegister = async (email, password) => {
  try {
    const response = await instance.post("/users/register", { email, password });
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchShortenUrl = async (url) => {
  try {
    const response = await instance.post("/urls/shorten", { url });
    return response.data;
  } catch (error) {
    console.error("Shorten URL error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchUrls = async () => {
  try {
    const response = await instance.get("/urls/getAll");
    return response.data;
  } catch (error) {
    console.error("Fetch URLs error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchDeleteUrl = async (id) => {
  try {
    const response = await instance.delete(`/urls/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete URL error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchDeleteAllUrls = async () => {
  try {
    const response = await instance.delete("/urls/deleteAll");
    return response.data;
  } catch (error) {
    console.error("Delete all URLs error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchDetailUrl = async (id) => {
  try {
    const response = await instance.get(`/urls/info/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fetch URL detail error:", error.response?.data || error.message);
    throw error;
  }
};
