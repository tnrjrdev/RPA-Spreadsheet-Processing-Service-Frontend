import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_URL,
});

export async function login(payload) {
  const { data } = await api.post('/login', payload);
  return data; // { access_token, ... }
}

export async function register(payload) {
  const { data } = await api.post('/register', payload);
  return data;
}

export async function getMe(token) {
  const { data } = await api.get('/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
