import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@ObjectType()
@Schema()
export class User extends Document {
    @Field(() => ID)
    _id: string;

    @Field()
    @Prop()
    username: string;
  
    @Prop()
    password: string;

    @Prop()
    @Field()
    role: string;

    @Field()
    token: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date; 
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async (next) => {
    console.log(" tett")
    next();
})

export { UserSchema };