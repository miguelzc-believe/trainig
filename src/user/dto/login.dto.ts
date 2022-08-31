import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail({}, {message: "Necesitas un email valido"})
    email: string;
    @ApiProperty()
    @IsString()
    password: string;
}