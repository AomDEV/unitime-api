import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { json } from 'express';
import { PrismaService } from '@/common/services/prisma.service';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';

async function bootstrap() {
	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);

	// ** Injectable loader
	const prismaService = app.get<PrismaService>(PrismaService);

	app.use(json({ limit: '5mb' })); //5mb limit
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.enableVersioning({
		type: VersioningType.URI,
	});
	app.setGlobalPrefix('api');
	app.enableCors({});
	app.enableVersioning({type: VersioningType.URI});

	const config = new DocumentBuilder()
		.setTitle('UniTime')
		.setDescription('Organize class schedules, teaching schedules, and exam schedules.')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	//* Shutdown Hooks
	await prismaService.enableShutdownHooks(app);

	await app.listen(PORT);
}
bootstrap();
