import { pool } from '../Config/db.js';

export const allRegionsQ = async () => {
  const query = `SELECT id, name, crop, climate_zone, center_latitude, center_longitude FROM regions ORDER BY id ASC;`;
  const { rows } = await pool.query(query);
  return rows;
};