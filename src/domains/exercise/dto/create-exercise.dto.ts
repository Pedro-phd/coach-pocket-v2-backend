import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateExerciseDto {
	@IsNotEmpty()
	@ApiProperty()
	title: string
	@ApiProperty()
	description?: string
	@ApiProperty()
	content?: string
	@ApiProperty()
	thumbUrl?: string
}
