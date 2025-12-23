import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId; // means its optional
    createdAt?: Date;
    updatedAt?: Date; 
}

// declaring user schemaa
const userSchema = new Schema<IUser>(
    {
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
}
},
{
    timestamps: true
}
)

// pre hooks - hook before data trnasfer to db like in between data and db - use like before going data into db we take password and hash it and then this hashed password stored in db
// post hooks - hook after db 
// This is Mongoose middleware that runs before saving a user into MongoDB.
userSchema.pre('save', async function(next){
if (this.isModified("password")) { // "this" refers to the current user object - If the password changes, it automatically gets hashed before saving.
    // take the plain password and then hashed it by 10 round and then stored this hashed password inside DB
    this.password = await bcrypt.hash(this.password, 10);
}
next();
});

// means if models is already present then give user from it to me if not then make a user model for me from this schema
// <IUser> it means follow this template we defien earlier
const User = models?.User || model<IUser>("User", userSchema)

export default User;