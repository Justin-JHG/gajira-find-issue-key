import fs from 'fs'
import YAML from 'yaml'
import { setOutput, setFailed, getInput } from '@actions/core'
import Action from './action.js'

const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`

// Dynamic import for GitHub event
const githubEvent = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function exec () {
  try {
    const result = await new Action({
      githubEvent,
      argv: parseArgs(),
      config,
    }).execute()

    if (result) {
      console.log(`Detected issueKey: ${result.issue}`)
      console.log(`Saving ${result.issue} to ${cliConfigPath}`)
      console.log(`Saving ${result.issue} to ${configPath}`)

      // Expose created issue's key as an output
      setOutput('issue', result.issue)

      const yamledResult = YAML.stringify(result)
      const extendedConfig = Object.assign({}, config, result)

      fs.writeFileSync(configPath, YAML.stringify(extendedConfig))

      return fs.appendFileSync(cliConfigPath, yamledResult)
    }

    console.log('No issue keys found.')
  } catch (error) {
    setFailed(error.toString())
  }
}

function parseArgs () {
  return {
    string: getInput('string') || config.string,
    from: getInput('from'),
  }
}

exec()
