import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { FoodService } from './food.service'
import { CreateFoodDto } from './dto/create-food.dto'
import { UpdateFoodDto } from './dto/update-food.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CacheTTL } from '@nestjs/cache-manager'
import { AuthGuard } from '@nestjs/passport'
import { User, UserDecorator } from 'src/decorators/user.decorator'

@CacheTTL(60 * 5) // 5 minutes of cache
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Food')
@Controller('food')
export class FoodController {
	constructor(private readonly foodService: FoodService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	create(@Body() createFoodDto: CreateFoodDto, @User() user: UserDecorator) {
		return this.foodService.create(createFoodDto, user)
	}

	@Get()
	findAll(@User() user: UserDecorator) {
		return this.foodService.findAll(user)
	}

	@Get(':id')
	findOne(@Param('id') id: string, @User() user: UserDecorator) {
		return this.foodService.findOne(id, user)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto, @User() user: UserDecorator) {
		return this.foodService.update(id, updateFoodDto, user)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	remove(@Param('id') id: string, @User() user: UserDecorator) {
		return this.foodService.remove(id, user)
	}
}
