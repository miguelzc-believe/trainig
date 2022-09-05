import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}
  create(createPostDto: CreatePostDto) {
    try {
      return this.prisma.post.create({data: createPostDto as Prisma.PostUncheckedCreateInput})
    } catch (error) {
      return error;
    };
  }

  findAll() {
    // return this.prisma.post.findMany({include: {author: true}});
    return this.prisma.post.findMany({select: {title: true, content: true, id: true, published: true, author: {select: {name: true, lastName: true}}}});
  }

  findOne(id: number) {
    return this.prisma.post.findFirst({where: {id: id}});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return this.prisma.post.update({where: {id: id}, data: updatePostDto as Prisma.PostUncheckedUpdateInput})
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return this.prisma.post.delete({where: {id: id}});
  }

  disable(id: number) {
    try {
      return this.prisma.post.update({where: {id: id}, data: {published: false }})
    } catch (error) {
      return error;
    }
  }

  getState(id: number) {
    try {
      return this.prisma.post.findFirst({select: {published: true}, where: {id: id}})
    } catch (error) {
      return error;
    }
  }

  // enable(id: number, userId: number) {
  //   try {
  //     return this.prisma.post.update({
  //       where: {
  //         id: id,
  //         authorId: userId
  //       }, 
  //       data: {published: true }})
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
