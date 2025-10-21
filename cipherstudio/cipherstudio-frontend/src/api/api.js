import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const request = async (path, method="GET", data=null, token=null) => {
    const headers = { "Content-Type": "application/json" };
    if(token) headers["Authorization"] = `Bearer ${token}`;
    const res = await axios({ url: API + path, method, data, headers });
    return res.data;
};
