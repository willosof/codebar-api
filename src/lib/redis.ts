import { createClient } from 'redis'

if (!process.env.REDIS_HOST) {
    throw new Error('REDIS_HOST is undefined')
    process.exit(1)
}

if (!process.env.REDIS_PORT) {
    throw new Error('REDIS_PORT is undefined')
    process.exit(1)
}

if (!process.env.REDIS_PASS) {
    throw new Error('REDIS_PASS is undefined')
    process.exit(1)
}

const client = createClient({
    username: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASS || '',
    socket: {
        host: process.env.REDIS_HOST || '',
        port: parseInt(process.env.REDIS_PORT),
    },
})

export async function redisInit() {
    client.on('error', (err) => console.log('Redis Client Error', err))
    client.on('connect', () => console.log('Redis Client Connected'))
    client.on('ready', () => console.log('Redis Client Ready'))
    client.on('reconnecting', () => console.log('Redis Client Reconnecting'))
    client.on('end', () => {
        console.log('Redis Client End')
        process.exit(1)
    })

    await client.connect()

    console.log('Redis Connected')

    return
}

export default () => client
