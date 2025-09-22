import zod from "zod";

export const UserSchema = zod.object({
    name: zod.string().nonempty().toLowerCase(),
    email: zod.email().nonempty().toLowerCase(),
    password: zod.string().nonempty()
})

export const TaskSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    password: zod.string(),
    status: zod.enum(["to-do", "in progress", "blocked", "done"]),
    assignedTo: zod.string(),
})

