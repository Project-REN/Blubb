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

// Get readings for each Grid on a FArm
export const readingsForGridsOnFarmQ = async (farm_id) => {
  const query = `SELECT DISTINCT ON (g.id)
      g.id AS grid_id,g.grid_code,
      g.min_lat, g.max_lat, g.min_lon, g.max_lon,
      chl.temperature, chl.humidity, chl.soil_moisture,
      chl.rainfall, chl.vegetation_coverage, chl.ndvi,
      chl.health_score, chl.status, chl.primary_stress_factor,
      chl.recorded_at
    FROM grids g  LEFT JOIN crop_health_logs chl ON g.id = chl.grid_id
    WHERE g.farm_id = $1 ORDER BY g.id, chl.recorded_at DESC; `;
  const { rows } = await pool.query(query, [farm_id]);
  return rows;};

//GET DYING GRIDS for alerting Purposes
export const find_failing_grids_by_farm = async (farm_id) => {
  const query = `WITH latest_grid_logs AS (
      SELECT DISTINCT ON (grid_id) * FROM crop_health_logs
      ORDER BY grid_id, recorded_at DESC)
    SELECT 
      g.id AS grid_id,
      g.grid_code,
      g.min_lat, g.max_lat, g.min_lon, g.max_lon,
      lgl.health_score,
      lgl.status,
      lgl.primary_stress_factor,
      lgl.soil_moisture,
      lgl.ndvi,
      lgl.temperature,
      lgl.rainfall,
      lgl.recorded_at
    FROM grids g
    JOIN latest_grid_logs lgl ON g.id = lgl.grid_id
    WHERE g.farm_id = $1 AND lgl.status = 'FAILING'
    ORDER BY lgl.health_score ASC;`;
  const { rows } = await pool.query(query, [farm_id]);
  return rows;
};