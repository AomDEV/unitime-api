import { IUsecase } from "@/common/interfaces/usecase.interface";
import { PrismaService } from "@/common/services/prisma.service";
import { Injectable, Logger } from "@nestjs/common";
import * as moment from "moment";

@Injectable()
export class CronUsecase implements IUsecase<Promise<void>> {
    private readonly logger = new Logger(CronUsecase.name);

    constructor (
        private readonly prismaService: PrismaService
    ) {}

    async execute() {
        const tasks = await this.prismaService.task.findMany({
            where: {
                output: null,
                accepted_at: {
                    lte: moment().subtract(1, "hours").toDate()
                }
            },
            select: {
                id: true,
            }
        });
        this.logger.log(`Found ${tasks.length} hang up tasks`);
        for (const task of tasks) {
            this.logger.log(`Releasing task ${task.id}`);
            await this.prismaService.task.update({
                where: {
                    id: task.id,
                },
                data: {
                    output: null,
                    accepted_at: null,
                }
            });
        }
        this.logger.log(`Released ${tasks.length} hang up tasks`);
    }
}