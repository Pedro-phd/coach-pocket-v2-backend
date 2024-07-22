import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { PrismaService } from 'src/lib/prisma/prisma.service'
import { UserDecorator } from 'src/decorators/user.decorator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class MembersService {
	constructor(
		private prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cacheService: Cache,
	) {}

	async create(createMemberDto: CreateMemberDto, user: UserDecorator) {
		const CACHE_KEY = `findall-${user.id}`
		await this.cacheService.del(CACHE_KEY)

		return await this.prisma.member.create({
			data: {
				...createMemberDto,
				coach_id: user.id,
			},
		})
	}

	async findAll(user: UserDecorator) {
		const CACHE_KEY = `findall-${user.id}`

		const cache = await this.cacheService.get(CACHE_KEY)
		if (cache) {
			return cache
		}

		const db = await this.prisma.member.findMany({
			where: {
				coach_id: user.id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				updatedAt: true,
			},
		})

		await this.cacheService.set(CACHE_KEY, db)

		return db
	}

	async findOne(id: string, user: UserDecorator) {
		const CACHE_KEY = id

		const cache = await this.cacheService.get(CACHE_KEY)
		if (cache) {
			return cache
		}

		try {
			const db = await this.prisma.member.findUniqueOrThrow({
				where: {
					id,
					coach_id: user.id,
				},
				include: {
					diet: {
						select: {
							id: true,
							name: true,
							meals: {
								select: {
									food: {
										select: {
											name: true,
											kcal: true,
											carbohydrate: true,
											fat: true,
											protein: true,
										},
									},
									quantity: true,
									isReplace: true,
									period: true,
								},
							},
						},
					},
					workout: true,
					memberHistory: {
						select: {
							height: true,
							weight: true,
							updatedAt: true,
						},
					},
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

	async update(id: string, updateMemberDto: UpdateMemberDto, user: UserDecorator) {
		const CACHE_KEY = id

		try {
			const member = await this.prisma.member.findFirstOrThrow({
				where: {
					id,
					coach_id: user.id,
				},
			})
			await this.prisma.memberHistory.create({
				data: {
					memberId: member.id,
					height: member.height,
					weight: member.weight,
				},
			})

			await this.prisma.member.update({
				data: {
					...updateMemberDto,
				},
				where: {
					id,
					coach_id: user.id,
				},
			})
			await this.cacheService.del(`findall-${user.id}`)
			await this.cacheService.del(CACHE_KEY)
			return null
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Member not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async remove(id: string, user: UserDecorator) {
		const CACHE_KEY = id

		try {
			await this.prisma.member.delete({
				where: {
					id,
					coach_id: user.id,
				},
			})
			await this.cacheService.del(CACHE_KEY)
			await this.cacheService.del(`findall-${user.id}`)
			return null
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Member not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
