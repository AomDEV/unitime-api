import { IUsecase } from "@/common/interfaces/usecase.interface";
import { PrismaService } from "@/common/services/prisma.service";
import { Task } from "@/generated";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AcceptTaskDTO } from "@/task/dto/accept.dto";
import { toXml } from "xml2json";
import { Response } from "express";

type AcceptProps = {
    body: AcceptTaskDTO,
    response: Response
};

@Injectable()
export class AcceptUsecase implements IUsecase<Promise<Response<any, Record<string, any>>>> {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async execute({
        body,
        response
    }: AcceptProps): Promise<Response<any, Record<string, any>>> {
        if (body.key !== process.env.SECRET_KEY) throw new ForbiddenException("Invalid key");

        const task = await this.prismaService.task.findFirstOrThrow({
            where: {
                input: {
                    not: null,
                },
                accepted_at: null,
            },
            orderBy: {
                id: "asc",
            },
            select: {
                id: true,
            }
        }).catch(() => {
            throw new NotFoundException("Task not found");
        });
        const updated = await this.prismaService.task.update({
            where: {
                id: task.id,
            },
            data: {
                accepted_at: new Date(),
            }
        });
        response.set('Content-Type', 'text/xml');
        return response.send(toXml(JSON.stringify(updated.input)));
    }
}