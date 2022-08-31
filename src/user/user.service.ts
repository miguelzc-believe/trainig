import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async create(data: CreateUserDto) {
        try {
            return this.prisma.user.create({data: data as Prisma.UserCreateInput})
        } catch (error) {
            return error;
        }
    }

    getUsers() {
        try {
            return this.prisma.user.findMany();
        } catch (error) {
            return error;
        }
    }

    // getUser(id: number) {
    //     try {
    //         return this.prisma.user.findFirst({where: {id: id}});
    //     } catch (error) {
    //         return error;
    //     }
    // }

    editUser(id: number, updateUserDto: UpdateUserDto) {
        try {
            return this.prisma.user.update({where: {id: id}, data: updateUserDto as Prisma.UserCreateInput})
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    deleteUser(id: number) {
        try {
            return this.prisma.user.delete({where: {id: id}});
        } catch (error) {
            return error;
        }
    }

    getUsername(name: string) {
        try {
            return this.prisma.user.findFirst({where: {name: name}});
        } catch (error) {
            return error;
        }
    }

    getByEmail(email: string) {
        try {
            return this.prisma.user.findFirst({where: {email: email}});
        } catch (error) {
            return error;
        }
    }
}
