import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { MembersModule } from './domains/members/members.module'
import { PrismaService } from './lib/prisma/prisma.service'
import { PrismaModule } from './lib/prisma/prisma.module'
import { DietModule } from './domains/diet/diet.module'
import { CacheModule } from './lib/cache/cache.module'

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, MembersModule, PrismaModule, DietModule, CacheModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
