import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsInt, IsString } from "class-validator"

export class CreateLikeDto {
    @ApiProperty()
    @IsInt()
    userId: number
    @ApiProperty()
    @IsInt()
    postId: number
}
