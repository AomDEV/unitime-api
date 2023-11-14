import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Response } from "@nestjs/common";
import { ListUsecase } from "./usecases/list.usecase";
import { InfoUsecase } from "./usecases/info.usecase";
import { isJSON } from "class-validator";
import { CreateTaskDTO } from "./dto/create.dto";
import { CompleteTaskDTO } from "./dto/complete.dto";
import { AcceptTaskDTO } from "./dto/accept.dto";
import { CreateUsecase } from "./usecases/create.usecase";
import { AcceptUsecase } from "./usecases/accept.usecase";
import { CompleteUsecase } from "./usecases/complete.usecase";
import { Response as ExpressResponse } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Task")
@Controller({version: "1", path: "task"})
export class TaskController {
    constructor (
        private readonly listUsecase: ListUsecase,
        private readonly infoUsecase: InfoUsecase,
        private readonly createUsecase: CreateUsecase,
        private readonly acceptUsecase: AcceptUsecase,
        private readonly completeUsecase: CompleteUsecase,
    ) {}

    @Get()
    async getTasks(
        @Query("page", ParseIntPipe) page: number = 1,
        @Query("limit", ParseIntPipe) limit: number = 20,
        @Query("query") query: string = "{}",
    ) {
        if(!isJSON(query)) throw new BadRequestException("Query must be a valid JSON");

        return this.listUsecase.execute({
            page,
            limit,
            query: JSON.parse(query),
        });
    }

    @Get("accept")
    async getAccept () {
        return this.acceptUsecase.execute({});
    }

    @Get(":id")
    async getTask(
        @Param("id", ParseIntPipe) id: number,
    ) {
        return this.infoUsecase.execute({id});
    }

    @Post()
    async createTask(
        @Body() body: CreateTaskDTO,
    ) {
        return this.createUsecase.execute({body});
    }

    @Post(":id/accept")
    async accept(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: AcceptTaskDTO,
        @Response() response: ExpressResponse,
    ) {
        return this.acceptUsecase.execute({id, body, response});
    }

    @Post(":id/complete")
    async complete(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: CompleteTaskDTO,
    ) {
        return this.completeUsecase.execute({id, body});
    }
}