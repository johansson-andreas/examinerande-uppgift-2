import mongoose, { Schema, InferSchemaType} from "mongoose";



const TaskSchema = new Schema({
    title: {type:String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['to-do', 'in progress', "blocked", "done"]},
    assignedTo: {type:mongoose.Types.ObjectId}, 
    createdAt: {type: Date, required: true},
    finishedAt: {type: Date}

})

export const Task = mongoose.model("Task", TaskSchema);
export type TaskModel = InferSchemaType<typeof TaskSchema>
export type PartialTaskModel = Partial<TaskModel>
