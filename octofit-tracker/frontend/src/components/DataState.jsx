function DataState({ loading, error, empty, children }) {
  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2" role="status">
        <div className="spinner-border spinner-border-sm" aria-hidden="true"></div>
        <span>Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Unable to load data: {error}
      </div>
    )
  }

  if (empty) {
    return <div className="alert alert-secondary">No records found.</div>
  }

  return children
}

export default DataState
