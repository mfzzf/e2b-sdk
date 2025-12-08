import * as commander from 'commander'
import * as fs from 'fs'
import * as path from 'path'

import {
  getUserConfig,
  USER_CONFIG_PATH,
  UserConfig,
} from 'src/user'
import { asFormattedConfig, asFormattedError } from 'src/utils/format'

export const loginCommand = new commander.Command('login')
  .description('log in to CLI')
  .action(async () => {
    let userConfig: UserConfig | null = null

    try {
      userConfig = getUserConfig()
    } catch (err) {
      console.error(asFormattedError('Failed to read user config', err))
    }

    if (userConfig) {
      console.log(
        `\nAlready logged in. ${asFormattedConfig(
          userConfig
        )}.\n\nIf you want to log in as a different user, log out first by running 'e2b auth logout'.\nTo change the team, run 'e2b auth configure'.\n`
      )
      return
    }

    console.log('Log in to E2B CLI.')

    const inquirer = await import('inquirer')

    const { apiKey } = await inquirer.default.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: 'Enter your API Key:',
        mask: '*',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'API Key cannot be empty'
          }
          return true
        },
      },
    ])

    userConfig = {
      email: 'api-key-user',
      accessToken: apiKey,
      teamName: 'default',
      teamId: 'default',
      teamApiKey: apiKey,
    }

    fs.mkdirSync(path.dirname(USER_CONFIG_PATH), { recursive: true })
    fs.writeFileSync(USER_CONFIG_PATH, JSON.stringify(userConfig, null, 2))

    console.log(`\nLogged in successfully.`)
    process.exit(0)
  })
