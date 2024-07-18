import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsNotEmpty } from 'class-validator'
class Meal {
	@IsNotEmpty()
	@ApiProperty()
	foodId: string
	@IsNotEmpty()
	@ApiProperty()
	quantity: string
	@IsNotEmpty()
	@ApiProperty()
	period: string
	@IsNotEmpty()
	@ApiProperty()
	isReplace: boolean
}

export class CreateDietDto {
	@IsNotEmpty()
	@ApiProperty()
	memberId: string
	@IsNotEmpty()
	@ApiProperty()
	name: string
	@IsNotEmpty()
	@ApiProperty({
		isArray: true,
		type: Meal,
	})
	meal: Meal[]
}
