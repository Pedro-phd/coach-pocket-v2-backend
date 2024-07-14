import { createParamDecorator } from '@nestjs/common'
import { SupabaseAuthUser } from 'nestjs-supabase-auth-v2'

export interface UserDecorator extends SupabaseAuthUser {}

export const User = createParamDecorator<UserDecorator>((_, req) => {
	return req.args[0].user
})
