import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class CacheRepository {
	cache = new Redis({
		port: 6379,
		host: '127.0.0.1',
		db: 0,
	})

	async saveData<T>(data: T, key: string): Promise<void> {
		await this.cache.set(key, JSON.stringify(data), 'EX', 180)
	}

	async getData<T>(key: string): Promise<T> {
		return JSON.parse(await this.cache.get(key)) as T
	}

	async clearCache(key: string) {
		await this.cache.del(key)
	}
}
