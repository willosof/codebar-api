import fs from 'fs/promises'
import { redisInit } from './lib/redis'
import { socketInit } from './lib/socket'
let connections = 0

async function compat() {
    console.log('lul')
    setInterval(() => {
        console.log('Processed', connections, 'connections')
    }, 10000)

    console.log('alive')

    redisInit()
    socketInit()

    await fs.writeFile('/tmp/healthy', 'healthy')
}

compat()

process.on('SIGINT', () => {
    console.log('SIGINT')
    process.exit(0)
})
process.on('SIGTERM', () => {
    console.log('SIGTERM')
    process.exit(0)
})
