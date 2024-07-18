import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { MembersModule } from './domains/members/members.module'
import { PrismaService } from './lib/prisma/prisma.service'
import { PrismaModule } from './lib/prisma/prisma.module'
import { CacheModule } from '@nestjs/cache-manager'
import { FoodModule } from './domains/food/food.module'
import { DietModule } from './domains/diet/diet.module'
import * as redisStore from 'cache-manager-redis-store'

@Module({
	imports: [
		ConfigModule.forRoot(),
		CacheModule.register({
			isGlobal: true,
			store: redisStore,
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
			username: process.env.REDIS_USERNAME,
			password: process.env.REDIS_PASSWORD,
			no_ready_check: process.env.REDIS_ENVIRONMENT === 'dev',
		}),
		PrismaModule,
		AuthModule,
		MembersModule,
		PrismaModule,
		DietModule,
		FoodModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
