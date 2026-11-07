import {findDyingGridsByFarmS,syncFarmHealthFromApi } from '../Services/cropHealthServices.js';
import { readingsForGridsOnFarmQ } from '../Repositories/cropHealthRepository.js';

// Sync external satellite data into Postgres for a farm
export const syncFarmHealthC = async (req, res) => {
  try {
    const { farmId } = req.params;
    const { regionId = 1, cropType = 'WHEAT' } = req.body;
    const records = await syncFarmHealthFromApi(Number(farmId), Number(regionId), cropType);
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get failing grids for dashboard alerts
export const getDyingGridsC = async (req, res) => {
  try {
    const { farmId } = req.params;
    const { cropType = 'WHEAT' } = req.query;
    const dyingGrids = await findDyingGridsByFarmS(Number(farmId), cropType);
    return res.status(200).json({ success: true, data: dyingGrids });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get latest readings for all grids in a farm
export const getFarmGridsReadingsC = async (req, res) => {
  try {
    const { farmId } = req.params;
    const readings = await readingsForGridsOnFarmQ(Number(farmId));
    return res.status(200).json({ success: true, data: readings });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Mock fallback
export const getCropHealthC = async (req, res) => {
  try {
    const { id } = req.params;
    const mockData = {
      cropId: id,
      cropType: "Wheat",
      metrics: {
        soilMoisture: 10.6,
        temperature: 48.2, // fixed spelling
        humidity: 5.33,
        windSpeed: 44,
        rainFall: 1,
      },
      status: "FAILING",
      lastUpdated: new Date().toISOString()
    };
    return res.status(200).json({ success: true, data: mockData });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};