import express from 'express';
import cors from 'cors';
import {health} from './Routes/cropHealthRoutes.js';

export const app= express();

app.use(cors());//cross origin stuff allows the frontend to talk to backEnd

app.use(express.json());

//ROUTeS

app.use("/api/mock/crops",health);

const PORT = process.env.PORT || 5002;
app.listen(PORT,()=> {
    console.log(`Server Live at ${PORT}`);
})


