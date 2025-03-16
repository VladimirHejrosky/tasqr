import { z } from "zod"

export const newTaskSchema = z.object({
    label: z.string().min(1, "Povinné pole").max(100, "Maximálně 100 znaků"),
    priority: z.number().min(0).max(2),
    repeat: z.enum(["none", "daily", "weekly", "monthly"])
})