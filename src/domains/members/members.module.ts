import { Module } from '@nestjs/common'
import { MembersService } from './members.service'
import { MembersController } from './members.controller'
import { PrismaService } from 'src/lib/prisma/prisma.service'
import { CacheRepository } from 'src/lib/cache/cache.repository'
import { CacheModule } from 'src/lib/cache/cache.module'

@Module({
	imports: [CacheModule],
	controllers: [MembersController],
	providers: [MembersService],
})
export class MembersModule {}
