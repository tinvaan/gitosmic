'use strict'

const program = require('commander')

const actions = require('./actions')

program
  .version('0.0.1')
  .description('Git profile ranker')

program
  .command('github <username>')
  .option('--repos', 'List repositories')
  .option('--watchers', 'List watchers for all repositories')
  .option('--stargazers', 'List stargazers for all repositories')
  .action(async (username, action) => {
    if (action.repos) actions.repositories(username)
    else if (action.watchers) actions.watchers(username)
    else if (action.stargazers) actions.stargazers(username)
    else actions.profile(username)
  })

program.parse(process.argv)
