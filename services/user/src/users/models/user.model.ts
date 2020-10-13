import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Directive(`@key(fields: "_id")`)
@ObjectType()
@Schema()
export class User extends Document {
    @Field(() => ID)
    _id: string;

    @Field()
    @Prop()
    name: string;
    
    @Prop({ default: true })
    active: Boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date; 
}

export const UserSchema = SchemaFactory.createForClass(User);
