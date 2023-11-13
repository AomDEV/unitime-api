import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CronUsecase } from "./usecases/cron.usecase";

@Injectable()
export class TaskService {
    constructor (
        private readonly cronUsecase: CronUsecase,
    ) {}

    @Cron(CronExpression.EVERY_10_MINUTES)
    async every10min() {
        return this.cronUsecase.execute();
    }
}