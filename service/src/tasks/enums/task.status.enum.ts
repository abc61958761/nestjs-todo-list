import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
    WAITING='WAITING',
    DONE='DONE'
}


registerEnumType(TaskStatus, {
    name: 'TaskStatus'
})