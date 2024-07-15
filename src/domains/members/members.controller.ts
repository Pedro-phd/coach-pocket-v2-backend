import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Response,
	HttpStatus,
	HttpCode,
} from '@nestjs/common'
import { MembersService } from './members.service'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { User, UserDecorator } from 'src/decorators/user.decorator'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('members')
@ApiTags('Members')
export class MembersController {
	constructor(private readonly membersService: MembersService) {}

	@ApiBody({ type: CreateMemberDto })
	@Post()
	create(@Body() createMemberDto: CreateMemberDto, @User() user: UserDecorator) {
		return this.membersService.create(createMemberDto, user)
	}

	@Get()
	findAll(@User() user: UserDecorator) {
		return this.membersService.findAll(user)
	}

	@Get(':id')
	findOne(@Param('id') id: string, @User() user: UserDecorator) {
		return this.membersService.findOne(id, user)
	}

	@Patch(':id')
	@HttpCode(204)
	async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto, @User() user: UserDecorator) {
		await this.membersService.update(id, updateMemberDto, user)
		return null
	}

	@HttpCode(204)
	@Delete(':id')
	remove(@Param('id') id: string, @User() user: UserDecorator) {
		return this.membersService.remove(id, user)
	}
}
