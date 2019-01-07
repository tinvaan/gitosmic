'use strict'

const octokit = require('@octokit/rest')()

let authenticated
async function authenticate () {
  try {
    await octokit.authenticate({
      type: 'token',
      token: process.env.GITHUB_API_TOKEN
    })
    authenticated = true
  } catch (err) { authenticated = false }
  return authenticated
}

const profile = async (user) => {
  const response = await octokit.users.getByUsername({ username: user })
  return response
}

const repos = async (user, strict = false) => {
  if (!authenticated) authenticate()

  // Authored repositories
  let response = await octokit.repos.listForUser({ username: user })
  let authored = response.data.filter((repo) => { return !repo.fork })
  authored = authored.map((repo) => { return repo.full_name })

  // Accessible repositories
  response = await octokit.repos.list({ sort: 'updated' })
  let accessible = response.data.map((repo) => { return repo.full_name })

  return strict ? authored : (authored + accessible).split(',')
}

const stars = async (user) => {
  let count = 0
  const authored = await repos(user, true)

  for (let repo of authored) {
    const name = repo.split('/')[1]
    const response = await octokit.activity.listStargazersForRepo({ owner: user, repo: name })
    console.log(repo, '\t\t', response.data.length)
    count += response.data.length
  }

  return count
}

const watchers = async (user) => {
  let count = 0
  const authored = await repos(user, true)

  for (let repo of authored) {
    const name = repo.split('/')[1]
    const response = await octokit.activity.listWatchersForRepo({ owner: user, repo: name })
    console.log(repo, '\t\t', response.data.length)
    count += response.data.length
  }

  return count
}

module.exports = {
  profile,
  repos,
  stars,
  watchers
}
