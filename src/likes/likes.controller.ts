import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ValidationPipe } from 'src/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostService } from 'src/post/post.service';

@ApiTags("likes")
@ApiBearerAuth()
@Controller({version: "1", path: "likes"})
export class LikesController {
  constructor(private readonly likesService: LikesService, private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body(new ValidationPipe()) createLikeDto: CreateLikeDto, @Req() req: any) {
    if (req.user.user.roleId === 2) {
      createLikeDto.userId = req.user.user.id;
      var postData = this.postService.getState(createLikeDto.postId);
      if (postData.published) {
        return this.likesService.create(createLikeDto);
      } else {
        throw new UnauthorizedException({
          message: 'El post se encuentra deshabilitado',
          status: 401,
        });
      }
    }
    throw new UnauthorizedException({
      message: 'Solo los visitantes pueden dar like',
      status: 401,
    });
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
