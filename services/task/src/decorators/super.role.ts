import { SetMetadata } from '@nestjs/common';

export const SuperRoles = (...roles: string[]) => SetMetadata('super-roles', roles);