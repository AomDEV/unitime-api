import { DynamicModule, Module, Type } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from '@/common/services/prisma.service';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: ([
		ScheduleModule.forRoot(),
	] as (Type<any> | DynamicModule)[]).concat([
		TaskModule,
	]),
	controllers: [],
	providers: [
		AppService,
		PrismaService,
	],
})
export class AppModule {}
