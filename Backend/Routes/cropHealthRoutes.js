import express from 'express';
import {getCropHealthC}  from "../Controllers/cropHealthController.js";


export const health = express.Router();

//path to cropHealth Data
health.get('/:id/health',getCropHealthC);


