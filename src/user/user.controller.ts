import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe, Request, Query, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtPayload } from 'src/auth/jwt-payload';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@ApiTags("user")
@ApiBearerAuth()
@Controller({version: "1", path: "user"})
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    async createUser(@Body(new ValidationPipe()) data: CreateUserDto) {
        const bcrypt = require('bcrypt');
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
        data.password = hashedPassword;
        const params: Prisma.UserUpsertArgs = {where: {email: data.email}, create: data as Prisma.UserUncheckedCreateInput, update: data as Prisma.UserUncheckedUpdateInput} // crea si no existe y hace update si existe
        return this.userService.upsert(params)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('name')
    getUser(@Query('name') name: string) {
        const params: Prisma.UserFindFirstArgs = {where: {name: name}, include: {posts: true}}
        return this.userService.getFindFirst(params);
    }

    @Get('email')
    getEmail(@Query('email') email: string) {
        const params: Prisma.UserFindFirstArgs = {where: {email: email}}
        return this.userService.getFindFirst(params);
    }

    @Patch(':id')
    editUser(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
        return this.userService.editUser(+id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(+id);
    }
}
