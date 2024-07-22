import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { CreateDietDto } from './dto/create-diet.dto'
import { UpdateDietDto } from './dto/update-diet.dto'
import { PrismaService } from 'src/lib/prisma/prisma.service'
import { UserDecorator } from 'src/decorators/user.decorator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import makeCacheKey from 'src/lib/make-cache-key'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class DietService {
	constructor(
		private prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheService: Cache,
	) {}

	async create(createDietDto: CreateDietDto, user: UserDecorator) {
		await this.prisma.diet.create({
			data: {
				memberId: createDietDto.memberId,
				name: createDietDto.name,
				meals: {
					createMany: {
						data: createDietDto.meal,
					},
				},
			},
		})
	}

	async update(id: string, updateDietDto: UpdateDietDto, user: UserDecorator) {
		const CACHE_KEY_UNIQUE = makeCacheKey({ coachId: user.id, action: id })
		const CACHE_KEY_ALL = makeCacheKey({ coachId: user.id })

		try {
			await this.prisma.diet.delete({
				where: {
					id: id,
					memberId: updateDietDto.memberId,
				},
			})

			await this.create(updateDietDto, user)

			await this.cacheService.del(updateDietDto.memberId)
			await this.cacheService.del(CACHE_KEY_UNIQUE)
			await this.cacheService.del(CACHE_KEY_ALL)
			return null
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Food not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
