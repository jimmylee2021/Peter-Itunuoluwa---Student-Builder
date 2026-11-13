const interests = [
  'Frontend development and React',
  'Building practical digital products',
  'Technology education and explainers',
  'Community, programmes, and operations',
]

export default function ExploringSection() {
  return (
    <section className="exploring-section" id="exploring" aria-labelledby="exploring-title">
      <div className="section-wrap exploring-inner">
        <div>
          <p className="eyebrow section-index">03 / CURRENT CURIOSITIES</p>
          <h2 id="exploring-title">What I'm exploring.</h2>
        </div>
        <ul className="interest-list">
          {interests.map((interest, index) => (
            <li key={interest}>
              <span>{String(index + 1).padStart(2, '0')}</span>{interest}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
