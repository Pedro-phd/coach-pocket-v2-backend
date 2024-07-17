import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateFoodDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string
	@ApiProperty()
	@IsNotEmpty()
	kcal: string
	@ApiProperty()
	@IsNotEmpty()
	carbohydrate: string
	@ApiProperty()
	@IsNotEmpty()
	protein: string
	@ApiProperty()
	@IsNotEmpty()
	fat: string
	@ApiProperty()
	@IsNotEmpty()
	referenceValue: string
}
