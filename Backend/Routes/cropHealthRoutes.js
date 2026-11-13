import express from 'express';
import {getCropHealthC,syncFarmHealthC,getDyingGridsC,getFarmGridsReadingsC 
} from '../Controllers/cropHealthController.js';

export const health = express.Router();

health.post('/farms/:farmId/sync', syncFarmHealthC);
health.get('/farms/:farmId/dying-grids', getDyingGridsC);
health.get('/farms/:farmId/readings', getFarmGridsReadingsC);


//mock
health.get('/:id/health', getCropHealthC);

