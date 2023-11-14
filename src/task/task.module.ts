import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { AcceptUsecase } from "./usecases/accept.usecase";
import { CompleteUsecase } from "./usecases/complete.usecase";
import { CreateUsecase } from "./usecases/create.usecase";
import { CronUsecase } from "./usecases/cron.usecase";
import { InfoUsecase } from "./usecases/info.usecase";
import { ListUsecase } from "./usecases/list.usecase";
import { TaskService } from "./task.service";
import { PrismaService } from "@/common/services/prisma.service";

@Module({
    imports: ([]).concat(
    ),
    controllers: [
        TaskController
    ],
    providers: [
        AcceptUsecase,
        CompleteUsecase,
        CreateUsecase,
        CronUsecase,
        InfoUsecase,
        ListUsecase,

        PrismaService,
        TaskService,
    ],
})
export class TaskModule {}