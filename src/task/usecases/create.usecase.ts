import { IUsecase } from "@/common/interfaces/usecase.interface";
import { PrismaService } from "@/common/services/prisma.service";
import { Task } from "@/generated";
import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "@/task/dto/create.dto";

type CreateProps = {
    body: CreateTaskDTO
};

@Injectable()
export class CreateUsecase implements IUsecase<Promise<Task>> {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async execute({
        body
    }: CreateProps): Promise<Task> {
        return this.prismaService.task.create({
            data: {
                input: body.input,
            }
        });
    }
}