import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ProfileCard from './components/ProfileCard'
import RepoList from './components/RepoList'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (searchUsername) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch(`http://localhost:5000/api/github/${searchUsername}`)
      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Something went wrong')
        return
      }

      setData(json)
    } catch (err) {
      setError('Network error. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>GitHub Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      {data && (
        <>
          <ProfileCard user={data.user} />
          <RepoList repos={data.repos} />
        </>
      )}
    </div>
  )
}

export default App