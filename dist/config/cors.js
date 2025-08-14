"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const whitelist = [
    process.env.FRONTEND_URL,
    "http://localhost:4000",
    "https://nebacperu.com",
    "https://nebacperu.com/inventario"
];
exports.corsConfig = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Error de CORS"));
        }
    },
    credentials: true,
};
