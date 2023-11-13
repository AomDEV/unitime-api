import { IUsecase } from "@/common/interfaces/usecase.interface";
import { PrismaService } from "@/common/services/prisma.service";
import { Task } from "@/generated";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { CompleteTaskDTO } from "@/task/dto/complete.dto";
import { toJson } from "xml2json";

type CompleteProps = {
    id: number,
    body: CompleteTaskDTO
};

@Injectable()
export class CompleteUsecase implements IUsecase<Promise<Task>> {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    tryParseJSON(jsonString: string) {
        try {
            const o = JSON.parse(jsonString);
            if (o && typeof o === "object") return o;
        }
        catch (e) { }
        return null;
    }

    async execute({
        id,
        body
    }: CompleteProps): Promise<Task> {
        if (body.key !== process.env.SECRET_KEY) throw new ForbiddenException("Invalid key");

        const output = Buffer.from(body.output, "base64");
        const json = this.tryParseJSON(output.toString());
        if (!json) throw new ForbiddenException("Invalid output");
        return this.prismaService.task.update({
            where: {
                id,
            },
            data: {
                output: json
            }
        });
    }
}