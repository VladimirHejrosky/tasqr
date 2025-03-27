import { prisma } from "@/prisma/prisma";
import { Repeat } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const today = new Date()
    const isMonday = today.getDay() === 1
    const isNewMonth = today.getDate() === 1

    const updateConditions: Repeat[] = [Repeat.daily]

    if (isMonday) updateConditions.push(Repeat.weekly)
    if (isNewMonth) updateConditions.push(Repeat.monthly)

        try {    
            await prisma.task.updateMany({
                where: {repeat: {in: updateConditions}},
                data: { done: false}
            })
            
            return NextResponse.json({message: "Tasks updated"})

        } catch {

            return NextResponse.json({error: "Failed to update tasks"}, {status:500})
        }

}