import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService], imports: [], controllers: [UserController], exports: [UserService]
})
export class UserModule {}
