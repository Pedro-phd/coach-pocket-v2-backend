import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { DietService } from './diet.service'
import { CreateDietDto } from './dto/create-diet.dto'
import { UpdateDietDto } from './dto/update-diet.dto'
import { User, UserDecorator } from 'src/decorators/user.decorator'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('diet')
export class DietController {
	constructor(private readonly dietService: DietService) {}

	@Post()
	create(@Body() createDietDto: CreateDietDto, @User() user: UserDecorator) {
		return this.dietService.create(createDietDto, user)
	}

	@Get()
	findAll() {
		return this.dietService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.dietService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDietDto: UpdateDietDto) {
		return this.dietService.update(+id, updateDietDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.dietService.remove(+id)
	}
}
