import './PlantOrWait.css'

function PlantOrWait({ decision, reason }) {
  return (
    <div className="plant-card">
      <h2 className="plant-word">{decision}</h2>
      <p>{reason}</p>
    </div>
  )
}

export default PlantOrWait