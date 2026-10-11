import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config'
import DataState from './DataState'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${apiBaseUrl}/api/workouts/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
        return response.json()
      })
      .then((data) => {
        setWorkouts(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return (
    <section>
      <h2 className="mb-3">Workouts</h2>
      <DataState loading={loading} error={error} empty={workouts.length === 0}>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12 col-md-6" key={workout._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h5 card-title">{workout.name}</h3>
                  <p className="card-text">{workout.description}</p>
                  <span className="badge text-bg-primary me-2 text-capitalize">
                    {workout.activityType}
                  </span>
                  <span className="badge text-bg-secondary me-2 text-capitalize">
                    {workout.difficulty}
                  </span>
                  <span className="badge text-bg-light border">
                    {workout.durationMinutes} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataState>
    </section>
  )
}

export default Workouts
