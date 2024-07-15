// MEMBER
// id
// coach_id
// name
// email
// document
// birth_date
// height
// weight
// zipcode ?
// address_details ?
// house_number ?

import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateMemberDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string
	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string
	@ApiProperty()
	@IsNotEmpty()
	document: string
	@ApiProperty()
	@IsNotEmpty()
	birth_date: Date
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
