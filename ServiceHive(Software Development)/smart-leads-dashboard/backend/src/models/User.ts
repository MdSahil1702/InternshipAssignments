import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'sales';
  matchPassword(pass: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDoc>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role:     { type: String, enum: ['admin', 'sales'], default: 'sales' }
  },
  { timestamps: true }
);

UserSchema.pre<IUserDoc>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

UserSchema.methods.matchPassword = async function (
  this: IUserDoc,
  pass: string
): Promise<boolean> {
  return bcrypt.compare(pass, this.password);
};

export default mongoose.model<IUserDoc>('User', UserSchema);