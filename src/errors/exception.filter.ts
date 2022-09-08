import { HTTPError } from './http-error.class'
import { LoggerService } from './../logger/logger.service'
import { Request, Response, NextFunction } from 'express'
export class ExceptionFilter {
	logger: LoggerService
	constructor(logger: LoggerService) {
		this.logger = logger
	}
	catch(
		err: Error | HTTPError,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		if (err instanceof HTTPError) {
			this.logger.error(
				`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`
			)
			res.status(err.statusCode).send({ err: err.message })
		} else {
			this.logger.error(`${err.message}`)
			res.status(500).send({
				err: err.message,
			})
		}
	}
}
