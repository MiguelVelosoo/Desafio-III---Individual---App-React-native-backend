import { Schema, model, models } from 'mongoose';

export interface ITask {
  title: string;
  description?: string;
  completed: boolean;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export const Task = models.Task || model<ITask>('Task', taskSchema);
