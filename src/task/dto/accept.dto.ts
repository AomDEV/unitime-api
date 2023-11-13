import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AcceptTaskDTO {
    @ApiProperty()
    @IsString()
    key: string;
}