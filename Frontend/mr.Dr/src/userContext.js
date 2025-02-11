import { createContext } from "react";

export const initialState = {
  user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null, // ✅ Ensured token is part of the initial state
};

export const UserContext = createContext(initialState);