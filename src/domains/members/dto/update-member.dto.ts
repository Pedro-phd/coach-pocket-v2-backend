import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateMemberDto } from './create-member.dto'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string
	@ApiProperty()
	@IsNotEmpty()
	height: number
	@ApiProperty()
	@IsNotEmpty()
	weight: number
	@ApiProperty()
	zipcode?: string
	@ApiProperty()
	address_details?: string
	@ApiProperty()
	house_number?: string
}
