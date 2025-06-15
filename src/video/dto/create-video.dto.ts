import { IsString } from "class-validator";

export class CreateVideoDto {
    @IsString()
    name: string
}
