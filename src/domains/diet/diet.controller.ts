import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common'
import { DietService } from './diet.service'
import { CreateDietDto } from './dto/create-diet.dto'
import { UpdateDietDto } from './dto/update-diet.dto'
import { User, UserDecorator } from 'src/decorators/user.decorator'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Diet')
@Controller('diet')
export class DietController {
	constructor(private readonly dietService: DietService) {}

	@Post()
	create(@Body() createDietDto: CreateDietDto, @User() user: UserDecorator) {
		return this.dietService.create(createDietDto, user)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateDietDto: UpdateDietDto, @User() user: UserDecorator) {
		return this.dietService.update(id, updateDietDto, user)
	}
}
