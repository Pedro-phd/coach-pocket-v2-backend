import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateExerciseDto } from './create-exercise.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
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
