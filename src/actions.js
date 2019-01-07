'use strict'

const github = require('./github')

const profile = async (username) => {
  const info = await github.profile(username)
  console.log(info)
}

const repositories = async (username) => {
  const repos = await github.repos(username)
  console.log(repos)
}

const stargazers = async (username) => {
  const stars = await github.stars(username)
  console.log(stars)
}

const watchers = async (username) => {
  const subs = await github.watchers(username)
  console.log(subs)
}

module.exports = {
  profile,
  repositories,
  stargazers,
  watchers
}
