import { LoggerService } from './logger/logger.service'
import express, { Express } from 'express'
import { Server } from 'http'

export class App {
	app: Express
	server: Server
	port: number
	logger: LoggerService

	constructor(logger: LoggerService) {
		this.app = express()
		this.port = 8000
		this.logger = logger
	}

	async useRoutes() {
		this.app.use('/', (req, res) => {
			res.status(200).json({
				statusCode: 200,
				message: 'Server is starting',
				data: null,
			})
		})
	}

	public async init() {
		this.useRoutes()
		this.server = this.app.listen(this.port, () => {})
		this.logger.log(`Server is runing on ${this.port}`)
	}
}
