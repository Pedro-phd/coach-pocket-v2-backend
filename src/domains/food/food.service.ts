import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { CreateFoodDto } from './dto/create-food.dto'
import { UpdateFoodDto } from './dto/update-food.dto'
import { User, UserDecorator } from 'src/decorators/user.decorator'
import { PrismaService } from 'src/lib/prisma/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import makeCacheKey from 'src/lib/make-cache-key'
import { Cache } from 'cache-manager'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable()
export class FoodService {
	constructor(
		private prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheService: Cache,
	) {}

	async create(createFoodDto: CreateFoodDto, user: UserDecorator) {
		const CACHE_KEY = makeCacheKey({ coachId: user.id })
		await this.cacheService.del(CACHE_KEY)

		return await this.prisma.food.create({
			data: {
				id: '1',
				...createFoodDto,
				coach_id: user.id,
			},
		})
	}

	async findAll(user: UserDecorator) {
		const CACHE_KEY = makeCacheKey({ coachId: user.id })
		const cache = await this.cacheService.get(CACHE_KEY)

		if (cache) {
			return cache
		}

		const db = await this.prisma.food.findMany({
			where: {
				coach_id: user.id,
			},
		})

		await this.cacheService.set(CACHE_KEY, db)
		return db
	}

	async findOne(id: string, user: UserDecorator) {
		const CACHE_KEY = makeCacheKey({ coachId: user.id, action: id })
		const cache = await this.cacheService.get(CACHE_KEY)

		if (cache) {
			return cache
		}
		try {
			const db = await this.prisma.food.findFirstOrThrow({
				where: {
					coach_id: user.id,
					id,
				},
			})

			await this.cacheService.set(CACHE_KEY, db)
			return db
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Member not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async update(id: string, updateFoodDto: UpdateFoodDto, user: UserDecorator) {
		const CACHE_KEY_UNIQUE = makeCacheKey({ coachId: user.id, action: id })
		const CACHE_KEY_ALL = makeCacheKey({ coachId: user.id })

		try {
			await this.prisma.food.update({
				data: {
					...updateFoodDto,
				},
				where: {
					id,
					coach_id: user.id,
				},
			})

			await this.cacheService.del(CACHE_KEY_UNIQUE)
			await this.cacheService.del(CACHE_KEY_ALL)
			return null
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Member not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async remove(id: string, user: UserDecorator) {
		const CACHE_KEY_UNIQUE = makeCacheKey({ coachId: user.id, action: id })
		const CACHE_KEY_ALL = makeCacheKey({ coachId: user.id })

		try {
			await this.prisma.food.delete({
				where: {
					id,
					coach_id: user.id,
				},
			})

			await this.cacheService.del(CACHE_KEY_UNIQUE)
			await this.cacheService.del(CACHE_KEY_ALL)
			return null
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Member not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
