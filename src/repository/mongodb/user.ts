import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

const User = model<IUser>('User', UserSchema);

export { User, IUser };
