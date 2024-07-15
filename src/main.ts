import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(new ValidationPipe())

	const config = new DocumentBuilder()
		.setTitle('Coach Pocket')
		.setDescription('Coach Pocket ')
		.setVersion('1.0')
		.addTag('coach-pocket')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document)
	app.enableCors()

	await app.listen(3000)
}
bootstrap()
