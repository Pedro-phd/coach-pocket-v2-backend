import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateFoodDto } from './create-food.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
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
	lipids: string
}
