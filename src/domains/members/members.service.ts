import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDecorator } from 'src/decorators/user.decorator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable()
export class MembersService {
	constructor(private prisma: PrismaService) {}

	async create(createMemberDto: CreateMemberDto, user: UserDecorator) {
		console.log(user.id)
		return await this.prisma.member.create({
			data: {
				...createMemberDto,
				coach_id: user.id,
			},
		})
	}

	async findAll(user: UserDecorator) {
		return await this.prisma.member.findMany({
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
	}

	async findOne(id: string, user: UserDecorator) {
		try {
			return await this.prisma.member.findUniqueOrThrow({
				where: {
					id,
					coach_id: user.id,
				},
				include: {
					Diet: true,
					Workout: true,
					MemberHistory: {
						select: {
							height: true,
							weight: true,
							updatedAt: true,
						},
					},
				},
			})
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Member not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async update(id: string, updateMemberDto: UpdateMemberDto, user: UserDecorator) {
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
			return null
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Member not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async remove(id: string, user: UserDecorator) {
		try {
			await this.prisma.member.delete({
				where: {
					id,
					coach_id: user.id,
				},
			})
			return null
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new HttpException('Member not found', HttpStatus.NOT_FOUND)
			}
			throw new HttpException(error.message ?? '', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
