import { useState } from 'react'

function RepoCard({ repo }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="repo-card" onClick={() => setExpanded(!expanded)}>
      <div className="repo-header">
        <a href={repo.html_url} target="_blank" rel="noreferrer" 
           onClick={(e) => e.stopPropagation()}>
          {repo.name}
        </a>
        <span className="stars">⭐ {repo.stargazers_count}</span>
      </div>
      {repo.description && <p className="repo-desc">{repo.description}</p>}
      <div className="repo-meta">
        {repo.language && <span className="language">{repo.language}</span>}
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      {expanded && (
        <div className="repo-expanded">
          <p>⭐ Stars: {repo.stargazers_count}</p>
          <p>🍴 Forks: {repo.forks_count}</p>
          <p>👁️ Watchers: {repo.watchers_count}</p>
          <p>🔀 Default Branch: {repo.default_branch}</p>
          <p>📄 Open Issues: {repo.open_issues_count}</p>
        </div>
      )}
    </div>
  )
}

export default RepoCard