import { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config'
import DataState from './DataState'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${apiBaseUrl}/api/activities/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
        return response.json()
      })
      .then((data) => {
        setActivities(data)
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
      <h2 className="mb-3">Activities</h2>
      <DataState loading={loading} error={error} empty={activities.length === 0}>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Team</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.user?.name}</td>
                  <td>{activity.team?.name ?? '—'}</td>
                  <td className="text-capitalize">{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.distanceKm ?? '—'}</td>
                  <td>{activity.calories ?? '—'}</td>
                  <td>{new Date(activity.performedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </section>
  )
}

export default Activities
