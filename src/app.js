import express from "express"; //ECMAScript6 compatible
import path from "path"; //
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

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
app.use("/auth", authRoutes);
app.use(taskRoutes);

// Configuración de __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "build")));

// Redirige todas las solicitudes a `index.html`
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;
