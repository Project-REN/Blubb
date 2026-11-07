const API = process.env.API ;

const ZONE_NAMES = {
  1: 'Arsi',
  2: 'Jimma',
};

export const fetchAPIDataS = async (region_id = 1) => {
  const zone = ZONE_NAMES[region_id] || 'Arsi';

  try {
    // Run requests concurrently
    const [tempRes, humRes, soilRes, vegRes] = await Promise.all([
      fetch(`${API}/temperature/${zone}`),
      fetch(`${API}/humidity/${zone}`),
      fetch(`${API}/soil-moisture/${zone}`),
      fetch(`${API}/vegetation/${zone}`),
    ]);

    if (!tempRes.ok || !humRes.ok || !soilRes.ok || !vegRes.ok) {
      throw new Error(`External API fetch failed for zone ${zone}`);
    }

    const [tempData, humData, soilData, vegData] = await Promise.all([
      tempRes.json(),
      humRes.json(),
      soilRes.json(),
      vegRes.json(),
    ]);

    const ndvi = Number(vegData.ndvi ?? 0.5);
    // Ensure vegetation coverage is always between 0 and 100
    const vegetation_coverage = Math.max(0, Math.min(100, Number((ndvi * 100).toFixed(2))));
    // Ensure soil moisture is between 0 and 100
    const rawSoil = soilData.root !== undefined ? soilData.root * 100 : (soilData.value ?? 20);
    const soil_moisture = Math.max(0, Math.min(100, Number(rawSoil.toFixed(2))));

    return {
      temperature: Number(tempData.value ?? 25.0),
      humidity: Number(humData.value ?? 50.0),
      soil_moisture,
      ndvi,
      rainfall: 0.0,
      vegetation_coverage,
    };
  } catch (error) {
    console.error(`[APIServices] Error fetching external data for zone ${zone}:`, error.message);
    throw error;
  }
};