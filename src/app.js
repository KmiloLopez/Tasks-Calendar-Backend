import express from "express"; //ECMAScript6 compatible
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"; //como se exporta como default se puede traer y cambiar nombre a authToutes
import taskRoutes from "./routes/tasks.routes.js";
import cors from "cors";
import { FRONTEND_URL } from "./config.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//   });
app.use(cors({ origin: FRONTEND_URL, credentials: true })); //(credentials) tambien para que permita el paso de las cookies en la solucitud comunicacion back and front en navegador ya puede guardar las cookies recibidas

app.use(morgan("dev")); //morgan setup
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

export default app;
