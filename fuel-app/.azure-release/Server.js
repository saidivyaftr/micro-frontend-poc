const next = require('next')
const { createServer } = require('http')

const serverConfig = {
  hostname: 'localhost',
  port: process.env.PORT || 3000,
  env: process.env.APP_ENV || process.env.NODE_ENV || 'production',
}

const startServer = async (config) => {
  const serverOptions = {
    // dev: Boolean - Whether or not to launch Next.js in dev mode. Defaults to false
    // dir: String - Location of the Next.js project. Defaults to '.'
    quiet: config.env === 'production', // quiet: Boolean - Hide error messages containing server information. Defaults to false
    // conf: object - The same object you would use in next.config.js. Defaults to {}
  }

  const app = next(serverOptions)
  const handleNextRequests = app.getRequestHandler()

  const srv = createServer((req, res) => {
    handleNextRequests(req, res)
  })

  await new Promise((resolve, reject) => {
    // This code catches EADDRINUSE error if the port is already in use
    srv.on('error', reject)
    srv.on('listening', () => resolve())
    srv.listen(config.port, config.hostname)
  })

  // It's up to caller to run `app.prepare()`, so it can notify that the server
  // is listening before starting any intensive operations.
  return app
}

startServer(serverConfig)
  .then(async (app) => {
    console.log(
      `started server on host ${serverConfig.hostname}, port ${serverConfig.port}, env ${serverConfig.env}`,
    )

    await app.prepare()
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
