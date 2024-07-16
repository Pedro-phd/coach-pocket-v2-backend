import { Module } from '@nestjs/common'
import { CacheRepository } from './cache.repository'

@Module({
	providers: [CacheRepository],
	exports: [CacheRepository],
})
export class CacheModule {}
