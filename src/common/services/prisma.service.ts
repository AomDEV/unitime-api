import {
	INestApplication,
	Injectable,
	Logger,
	OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	private readonly logger = new Logger(PrismaService.name);
	async onModuleInit() {
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication) {
		const exitHandler = async () => {
            this.logger.warn('Disconnecting from database');
			await app.close();
		};

		process.on('exit', exitHandler);
		process.on('beforeExit', exitHandler);
		process.on('SIGINT', exitHandler);
		process.on('SIGTERM', exitHandler);
		process.on('SIGUSR2', exitHandler);
	}
}
