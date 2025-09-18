import mongoose, { Schema } from "mongoose";



const TaskSchema = new Schema({
    title: {type:String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['to-do', 'in progress', "blocked", "done"]},
    assignedTo: {type:String, required:true}, 
    createdAt: {type: Date, required: true},
    finishedAt: {type: Date, required:true}

})

export const Task = mongoose.model("Task", TaskSchema);

