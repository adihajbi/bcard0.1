import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = "https://bcard-ojqa.onrender.com/users";

// הוספת הטוקן לכל בקשה
function getConfig() {
    return {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    };
}

export function register(user: any) {
    return axios.post(api, user);
}

export function login(user: any) {
    return axios.post(`${api}/login`, user);
}

export function getUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;
        return jwtDecode(token);
    } catch (err) {
        return null;
    }
}

export function logout() {
    localStorage.removeItem("token");
}

// 👇 פונקציות חדשות לאדמין בלבד 👇

// קבלת כל המשתמשים
export function getAllUsers() {
    return axios.get(api, getConfig());
}

// מחיקת משתמש
export function deleteUser(id: string) {
    return axios.delete(`${api}/${id}`, getConfig());
}