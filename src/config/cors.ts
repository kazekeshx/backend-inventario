import { CorsOptions } from "cors";

const whitelist = [
    process.env.FRONTEND_URL,
    "http://localhost:4000",
    "https://nebacperu.com",
    "https://nebacperu.com/inventario",
    "https://www.nebacperu.com",
    "https://www.nebacperu.com/inventario"
];

export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de CORS"));
        }
    },
    credentials: true,
};