import axios from "axios";

const api = "https://bcard-ojqa.onrender.com/cards";

// פונקציה עזר להוספת הטוקן לכותרות הבקשה
function getConfig() {
    return {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    };
}

// קבלת כל הכרטיסים (פתוח לכולם)
export function getCards() {
    return axios.get(api);
}

// קבלת כרטיס בודד (פתוח לכולם)
export function getCard(id: string) {
    return axios.get(`${api}/${id}`);
}

// קבלת הכרטיסים של המשתמש הנוכחי (מוגן)
export function getMyCards() {
    return axios.get(`${api}/my-cards`, getConfig());
}

// יצירת כרטיס (מוגן)
export function createCard(card: any) {
    return axios.post(api, card, getConfig());
}

// עריכת כרטיס (מוגן)
export function editCard(id: string, card: any) {
    return axios.put(`${api}/${id}`, card, getConfig());
}

// לייק (מוגן)
export function setLike(id: string) {
    // ב-axios.patch הפרמטר השני הוא ה-Body והשלישי הוא ה-Config (headers)
    // חייבים לשלוח אובייקט ריק {} כפרמטר שני!
    return axios.patch(`${api}/${id}`, {}, getConfig());
}

// מחיקה (מוגן)
export function deleteCard(id: string) {
    return axios.delete(`${api}/${id}`, getConfig());
}