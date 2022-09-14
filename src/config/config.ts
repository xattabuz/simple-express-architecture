const { NODE_ENV } = process.env

export default {
	production: ['prod', 'production'].includes(NODE_ENV),
	redis: {
		host: process.env.REDIS_HOST || 'localhost',
		port: process.env.REDIS_PORT || '6379',
	},
}
