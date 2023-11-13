import { ApiProperty } from "@nestjs/swagger";
import { IsJSON } from "class-validator";

export class CreateTaskDTO {
    @ApiProperty()
    @IsJSON()
    input: any;
}