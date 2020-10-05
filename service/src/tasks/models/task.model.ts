import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from '../enums/task.status.enum';

@Directive(`@key(fields: "id")`)
@ObjectType()
@Schema()
export class Task extends Document {
    @Field(() => ID)
    @Prop()
    id: string;
  
    @Field()
    @Prop()
    title: string;
  
    @Field()
    @Prop()
    content: string;

    @Field(() => TaskStatus)
    @Prop()
    status: TaskStatus;
    
    @Prop()
    active: Boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date; 
}

export const TaskSchema = SchemaFactory.createForClass(Task);
