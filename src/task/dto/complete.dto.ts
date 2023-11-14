import { ApiProperty } from "@nestjs/swagger";
import { IsBase64, IsString } from "class-validator";

export class CompleteTaskDTO {
    @ApiProperty()
    @IsString()
    key: string;

    @ApiProperty()
    @IsBase64()
    output: string;
}