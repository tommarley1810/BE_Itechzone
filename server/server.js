/**
 * server.js — Entry point của ITechZone API Server
 */
import 'dotenv/config'
import app from './src/app.js'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n🚀 ITechZone API Server`)
  console.log(`   ➜ http://localhost:${PORT}`)
  console.log(`   ➜ ENV: ${process.env.NODE_ENV}`)
  console.log(`   ➜ API: http://localhost:${PORT}/api\n`)
})
