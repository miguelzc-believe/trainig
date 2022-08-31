import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
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
        return this.userService.create(data)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getUsers() {
        return this.userService.getUsers();
    }

    @Patch(':id')
    editUser(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
        return this.userService.editUser(+id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(+id);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return {
            User: req.user,
            msg: 'User logged in'
        };
    }

    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }
}
