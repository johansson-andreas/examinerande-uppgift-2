import mongoose, { Schema, InferSchemaType} from "mongoose";



const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, unique:true},
    password: {type:String, required:true}, 
})

export const User = mongoose.model("User", UserSchema);
export type UserModel = InferSchemaType<typeof UserSchema>
export type PartialUserModel = Partial<UserModel>


