import mongoose from "mongoose";
import zod from "zod";

export const UserSchema = zod.object({
    name: zod.string().nonempty(),
    email: zod.email().nonempty().toLowerCase(),
    password: zod.string().min(8)
})
export const PartialUserSchema = UserSchema.partial();

export const TaskSchema = zod.object({
    title: zod.string().nonempty(),
    description: zod.string().nonempty(),
    status: zod.enum(["to-do", "in progress", "blocked", "done"]),
    assignedTo: zod.string().nonempty().optional(),
    createdAt: zod.date(),
})
export const PartialTaskSchema = TaskSchema.partial().extend({
    finishedAt: zod.date().optional()
});