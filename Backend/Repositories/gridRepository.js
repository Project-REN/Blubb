import { pool } from '../Config/db.js';

// GET all grids for a farm
export const getGridsByFarmIdQ = async (farm_id) => {
  const query = ` SELECT id, farm_id, grid_code, min_lat, max_lat, min_lon, max_lon FROM grids
    WHERE farm_id = $1 ORDER BY grid_code ASC;`;

  const { rows } = await pool.query(query, [farm_id]);
  return rows;
};