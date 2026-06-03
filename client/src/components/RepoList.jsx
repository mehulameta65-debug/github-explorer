import { useState } from 'react'
import RepoCard from './RepoCard'

function RepoList({ repos }) {
  const [sortBy, setSortBy] = useState('stars')
  const [search, setSearch] = useState('')

  const filtered = repos
    .filter(repo => repo.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'updated') return new Date(b.updated_at) - new Date(a.updated_at)
      return 0
    })

  return (
    <div className="repo-list">
      <div className="repo-controls">
        <input
          type="text"
          placeholder="Search repos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="stars">Sort by Stars</option>
          <option value="name">Sort by Name</option>
          <option value="updated">Sort by Last Updated</option>
        </select>
      </div>
      <p className="repo-count">{filtered.length} repositories</p>
      {filtered.map(repo => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

export default RepoList