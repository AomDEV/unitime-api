import { ApiProperty } from "@nestjs/swagger";
import { IsDataURI, IsString } from "class-validator";

export class CompleteTaskDTO {
    @ApiProperty()
    @IsString()
    key: string;

    @ApiProperty()
    @IsDataURI()
    output: string;
}