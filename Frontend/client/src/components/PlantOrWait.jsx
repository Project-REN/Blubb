import { Sprout, Timer } from 'lucide-react'

function PlantOrWait({ decision, labels }) {
  const plant = decision === 'PLANT'

  return (
    <section
      className={plant ? 'verdict verdict-plant' : 'verdict verdict-wait'}
      aria-live="polite"
    >
      <div className="verdict-main">
        <div className="verdict-copy">
          <p className="verdict-question">{labels.question}</p>
          <h2 className="verdict-answer">{plant ? labels.plant : labels.wait}</h2>
          <p className="verdict-reason">{labels.reason}</p>
        </div>
        <span className="verdict-icon" aria-hidden="true">
          {plant ? <Sprout size={48} strokeWidth={1.7} /> : <Timer size={48} strokeWidth={1.7} />}
        </span>
      </div>
      <div className="verdict-trust">
        <span className="verdict-sample">{labels.sample}</span>
      </div>
    </section>
  )
}

export default PlantOrWait