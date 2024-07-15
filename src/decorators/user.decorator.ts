import { createParamDecorator } from '@nestjs/common'
import { AuthUser } from '@supabase/supabase-js'

export interface UserDecorator extends AuthUser {
	sub: string
}

export const User = createParamDecorator<UserDecorator>((_, req) => {
	return { id: req.args[0].user.sub, ...req.args[0].user }
})
