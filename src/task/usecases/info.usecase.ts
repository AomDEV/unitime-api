import { IUsecase } from "@/common/interfaces/usecase.interface";
import { PrismaService } from "@/common/services/prisma.service";
import { Task } from "@/generated";
import { Injectable, NotFoundException } from "@nestjs/common";

type InfoProps = {
    id: number;
};

@Injectable()
export class InfoUsecase implements IUsecase<Promise<Task>> {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async execute({
        id
    }: InfoProps): Promise<Task> {
        return this.prismaService.task.findUniqueOrThrow({
            where: {
                id
            }
        }).catch(() => {
            throw new NotFoundException("Task not found");
        });
    }
}