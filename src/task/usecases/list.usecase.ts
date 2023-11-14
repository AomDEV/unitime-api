import { IUsecase } from "@/common/interfaces/usecase.interface";
import { PrismaService } from "@/common/services/prisma.service";
import { Task } from "@/generated";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PaginatedResult, createPaginator } from "prisma-pagination";

type ListProps = {
    page?: number;
    limit?: number;
    query?: {[key: string]: any};
};

@Injectable()
export class ListUsecase implements IUsecase<Promise<PaginatedResult<Task>>> {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async execute({
        page = 1,
        limit = 20,
        query = {},
    }: ListProps): Promise<PaginatedResult<Task>> {
        const paginate = createPaginator({ perPage: limit });
        return paginate<Task, Prisma.TaskFindManyArgs>(this.prismaService.task, {
            where: query,
            orderBy: {
                id: 'desc',
            },
            select: {
                id: true,
                accepted_at: true,
                completed_at: true,
                created_at: true,
                updated_at: true,
                deleted_at: true,
            }
        }, {page, perPage: limit});
    }
}