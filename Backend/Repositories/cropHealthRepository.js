import { pool } from '../Config/db.js';

// INSERT CROP HEALTH log from FASTAPI
export const insertHealthLogQ = async ({
  grid_id,temperature,humidity,soil_moisture,rainfall,
  vegetation_coverage,ndvi,health_score,status,primary_stress_factor,}) => {
  const query = `INSERT INTO crop_health_logs (grid_id, temperature, humidity, soil_moisture,
   rainfall, vegetation_coverage, ndvi, health_score,status, primary_stress_factor)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)RETURNING *; `;
  
  
    const values = [grid_id,temperature,humidity,soil_moisture,rainfall,vegetation_coverage,ndvi,
    health_score,status,primary_stress_factor,];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Get readings for each Grid on a Farm
export const readingsForGridsOnFarmQ = async (farm_id) => {
  const query = `
    SELECT DISTINCT ON (g.id)
      g.id AS grid_id, g.grid_code,
      g.min_lat, g.max_lat, g.min_lon, g.max_lon,
      chl.temperature, chl.humidity, chl.soil_moisture,
      chl.rainfall, chl.vegetation_coverage, chl.ndvi,
      chl.health_score, chl.status, chl.primary_stress_factor,
      chl.recorded_at
    FROM grids g
    LEFT JOIN crop_health_logs chl ON g.id = chl.grid_id
    WHERE g.farm_id = $1 
    ORDER BY g.id, chl.recorded_at DESC NULLS LAST;
  `;
  const { rows } = await pool.query(query, [farm_id]);
  return rows;
};

// GET DYING GRIDS for alerting purposes (filtered by farm_id inside CTE for scale)
export const findDyingGridsByFarmQ = async (farm_id) => {
  const query = `
    WITH farm_grids AS (
      SELECT id, grid_code, min_lat, max_lat, min_lon, max_lon 
      FROM grids 
      WHERE farm_id = $1
    ),
    latest_grid_logs AS (
      SELECT DISTINCT ON (chl.grid_id) chl.*
      FROM crop_health_logs chl
      JOIN farm_grids fg ON chl.grid_id = fg.id
      ORDER BY chl.grid_id, chl.recorded_at DESC
    )
    SELECT 
      fg.id AS grid_id,
      fg.grid_code,
      fg.min_lat, fg.max_lat, fg.min_lon, fg.max_lon,
      lgl.health_score,
      lgl.status,
      lgl.primary_stress_factor,
      lgl.soil_moisture,
      lgl.ndvi,
      lgl.temperature,
      lgl.rainfall,
      lgl.recorded_at
    FROM farm_grids fg
    JOIN latest_grid_logs lgl ON fg.id = lgl.grid_id
    WHERE lgl.status = 'FAILING'
    ORDER BY lgl.health_score ASC;
  `;
  const { rows } = await pool.query(query, [farm_id]);
  return rows;
};