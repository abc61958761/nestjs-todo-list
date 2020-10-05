import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
    WAITING,
    DONE
}

registerEnumType(TaskStatus, {
    name: 'TaskStatus'
})