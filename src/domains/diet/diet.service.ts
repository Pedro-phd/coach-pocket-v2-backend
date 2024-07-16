import { Injectable } from '@nestjs/common'
import { CreateDietDto } from './dto/create-diet.dto'
import { UpdateDietDto } from './dto/update-diet.dto'
import { PrismaService } from 'src/lib/prisma/prisma.service'

@Injectable()
export class DietService {
	constructor(private prisma: PrismaService) {}

	create(createDietDto: CreateDietDto) {}

	findAll() {
		return 'This action returns all diet'
	}

	findOne(id: number) {
		return `This action returns a #${id} diet`
	}

	update(id: number, updateDietDto: UpdateDietDto) {
		return `This action updates a #${id} diet`
	}

	remove(id: number) {
		return `This action removes a #${id} diet`
	}
}
