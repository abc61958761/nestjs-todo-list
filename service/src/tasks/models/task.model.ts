import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from '../enums/task.status.enum';

@Directive(`@key(fields: "id")`)
@ObjectType()
@Schema()
export class Task extends Document {
    @Field(() => ID)
    _id: string;

    @Field()
    @Prop()
    title: string;
  
    @Field()
    @Prop()
    content: string;

    @Field(() => TaskStatus)
    @Prop()
    status: TaskStatus;
    
    @Prop({ default: true })
    active: Boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date; 
}

export const TaskSchema = SchemaFactory.createForClass(Task);
