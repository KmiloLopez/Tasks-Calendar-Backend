import express from 'express'; //ECMAScript6 compatible
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js'//como se exporta como default se puede traer y cambiar nombre a authToutes
import taskRoutes from './routes/tasks.routes.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'http://localhost:3000', credentials: true,
}));//(credentials) tambien para que permita el paso de las cookies en la solucitud comunicacion back and front en navegador ya puede guardar las cookies recibidas

app.use(morgan('dev'));//morgan setup
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

export default app