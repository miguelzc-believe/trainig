import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name: string;
    @ApiPropertyOptional()
    @IsString({message: ""})
    @IsOptional()
    lastName: string;
    @ApiProperty()
    @IsEmail({}, {message: "Necesitas un email valido"})
    email: string;
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty()
    @IsInt()
    roleId: number;
}