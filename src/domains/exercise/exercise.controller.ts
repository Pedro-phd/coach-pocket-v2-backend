import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ExerciseService } from './exercise.service'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { CacheTTL } from '@nestjs/cache-manager'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { User, UserDecorator } from 'src/decorators/user.decorator'

@CacheTTL(60 * 5) // 5 minutes of cache
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Exercise')
@Controller('exercise')
export class ExerciseController {
	constructor(private readonly exerciseService: ExerciseService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	create(@Body() createExerciseDto: CreateExerciseDto, @User() user: UserDecorator) {
		return this.exerciseService.create(createExerciseDto, user)
	}

	@Get()
	findAll(@User() user: UserDecorator) {
		return this.exerciseService.findAll(user)
	}

	@Get(':id')
	findOne(@Param('id') id: string, @User() user: UserDecorator) {
		return this.exerciseService.findOne(id, user)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto, @User() user: UserDecorator) {
		return this.exerciseService.update(id, updateExerciseDto, user)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	remove(@Param('id') id: string, @User() user: UserDecorator) {
		return this.exerciseService.remove(id, user)
	}
}
