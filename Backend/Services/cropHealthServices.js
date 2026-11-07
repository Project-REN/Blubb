import {
  findDyingGridsByFarmQ,
  insertHealthLogQ,
} from '../Repositories/cropHealthRepository.js';
import { getGridsByFarmIdQ } from '../Repositories/gridRepository.js';
import { fetchAPIDataS } from './APIServices.js';

// Recommendations mapped to database-compatible stress factor names
const RECOMMENDATIONS = {
  WHEAT: {
    'DROUGHT': 'Severe drought for wheat. Root moisture is depleted, irrigation needed.',
    'HEAT STRESS': 'Temperature exceeds 26°C. High heat will kill developing wheat seedlings.',
    'WATERLOGGING': 'Excess water. Clear drainage to prevent root rot.',
    'LOW VEGETATION': 'NDVI is low. Check plot for stem rust or nutrient deficiency.',
  },
  COFFEE: {
    'DROUGHT': 'Forest floor moisture too low. Water nursery beds and inspect shade.',
    'HEAT STRESS': 'Direct heat exposure. High temperature causes coffee blossoms to drop.',
    'WATERLOGGING': 'Waterlogged volcanic soil. Open trenches to aerate root zone.',
    'FUNGAL RISK': 'High humidity and heat. Coffee Berry Disease risk. Spray preventive copper.',
  },
};

const diagnoseHealthS = (metrics, crop_type) => {
  const { temperature, humidity, soil_moisture, ndvi } = metrics;
  let score = 100;
  let primary_stress_factor = 'NONE';
  const crop = (crop_type || 'WHEAT').toUpperCase();

  if (crop === 'WHEAT') {
    if (soil_moisture < 25) {
      score -= 40;
      primary_stress_factor = 'DROUGHT';
    } else if (temperature > 26) {
      score -= 30;
      primary_stress_factor = 'HEAT STRESS';
    } else if (ndvi < 0.35) {
      score -= 30;
      primary_stress_factor = 'LOW VEGETATION';
    }
  } else {
    // COFFEE
    if (humidity > 75 && temperature > 22) {
      score -= 40;
      primary_stress_factor = 'FUNGAL RISK';
    } else if (soil_moisture < 30) {
      score -= 35;
      primary_stress_factor = 'DROUGHT';
    } else if (ndvi < 0.45) {
      score -= 25;
      primary_stress_factor = 'LOW VEGETATION';
    }
  }

  score = Math.max(0, Math.min(100, score));

  let status = 'HEALTHY';
  if (score < 50) status = 'FAILING';
  else if (score < 75) status = 'STRESSED';

  return { health_score: score, status, primary_stress_factor };
};

export const findDyingGridsByFarmS = async (farm_id, crop_type = 'WHEAT') => {
  const failingGrids = await findDyingGridsByFarmQ(farm_id);
  const normalizedCrop = (crop_type || 'WHEAT').toUpperCase();

  return failingGrids.map((grid) => {
    const stress = grid.primary_stress_factor || 'NONE';
    const recommendation =
      RECOMMENDATIONS[normalizedCrop]?.[stress] ||
      'Inspect grid conditions and calibrate sensors.';

    return {
      grid,
      recommendation,
    };
  });
};

// Sync live satellite data from external API into Postgres
export const syncFarmHealthFromApi = async (farm_id, region_id, crop_type = 'WHEAT') => {
  const baseMetrics = await fetchAPIDataS(region_id);
  const grids = await getGridsByFarmIdQ(farm_id);

  const savedRecords = [];
  for (const grid of grids) {
    // Clamp variance within valid DB bounds
    const ndvi = Number(Math.max(-1.0, Math.min(1.0, baseMetrics.ndvi + (Math.random() * 0.04 - 0.02))).toFixed(3));
    const soil_moisture = Number(Math.max(0, Math.min(100, baseMetrics.soil_moisture + (Math.random() * 4 - 2))).toFixed(2));

    const gridMetrics = {
      ...baseMetrics,
      ndvi,
      soil_moisture,
    };

    const diagnosis = diagnoseHealthS(gridMetrics, crop_type);

    const log = await insertHealthLogQ({
      grid_id: grid.id,
      ...gridMetrics,
      ...diagnosis,
    });

    savedRecords.push(log);
  }

  return savedRecords;
};