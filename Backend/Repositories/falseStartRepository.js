import { pool } from '../Config/db.js';

//Getting the Latest False start Check for One of the Regions
export const latestFalseStartByRegionQ = async (region_id) => {
  const query = `SELECT id, region_id, season_name, is_false_start, confidence,
           dry_spell_risk_days, cumulative_rain_mm, recommendation, assessed_at
          FROM false_start  WHERE region_id = $1  ORDER BY assessed_at DESC  LIMIT 1; `;
  const { rows } = await pool.query(query, [region_id]);
  return rows[0] || null;
};

//Inserting new data Incoming from FAST API
export const insertIncomingFastAPIDataQ = async ({
  region_id,season_name,is_false_start,confidence,dry_spell_risk_days,cumulative_rain_mm,recommendation,}) => {
  const query = `INSERT INTO false_start (region_id, season_name, is_false_start, confidence,
                 dry_spell_risk_days, cumulative_rain_mm, recommendation)
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  const values = [region_id,season_name,is_false_start,confidence,dry_spell_risk_days,cumulative_rain_mm,recommendation,];
  const { rows } = await pool.query(query, values);
  return rows[0];};