import { buildServer } from './server'

const start = async () => {
    const server = buildServer()

    try {
        // Use PORT from environment or default to 3000
        const port = parseInt(process.env.PORT || '3000')
        await server.listen({ port, host: '0.0.0.0' })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()
