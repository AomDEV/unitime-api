import { ApiProperty } from "@nestjs/swagger";
import { IsObject } from "class-validator";

export class CreateTaskDTO {
    @ApiProperty()
    @IsObject()
    input: any;
}