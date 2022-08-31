import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsInt, IsString } from "class-validator"

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    title: string
    @ApiPropertyOptional()
    @IsString()
    content?: string | null
    @ApiPropertyOptional()
    @IsBoolean()
    published?: boolean
    @ApiProperty()
    @IsInt()
    authorId: number
}
