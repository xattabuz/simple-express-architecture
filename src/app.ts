import { ExceptionFilter } from './errors/exception.filter';
import { UserController } from './users/users.controller'
import { LoggerService } from './logger/logger.service'
import express, { Express } from 'express'
import { Server } from 'http'

export class App {
	app: Express
	server: Server
	port: number
	logger: LoggerService
	userController: UserController
	exceptionFilter: ExceptionFilter

	constructor(logger: LoggerService, userController: UserController, exceptionFilter: ExceptionFilter) {
		this.app = express()
		this.port = 8000
		this.logger = logger
		this.userController = userController
		this.exceptionFilter = exceptionFilter
	}

	async useRoutes() {
		this.app.use('/users', this.userController.router)
	}

	useExceptionFilters(){
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	public async init() {
		this.useRoutes()
		this.useExceptionFilters()
		this.server = this.app.listen(this.port, () => {})
		this.logger.log(`Server is runing on ${this.port}`)
	}
}
