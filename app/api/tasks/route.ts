import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/app/tasks/components/TaskCard";

const tasks: Task[] = [
    { id: "1", label: "Buy groceries", done: false, priority: 1, repeat: "weekly" },
    { id: "2", label: "Clean the kitchen", done: true, priority: 2, repeat: "none" },
    { id: "3", label: "Pay bills", done: false, priority: 3, repeat: "monthly" },
    { id: "4", label: "Complete project report", done: false, priority: 2, repeat: "none" },
    { id: "5", label: "Walk the dog", done: true, priority: 1, repeat: "daily" },
    { id: "6", label: "Exercise for 30 minutes", done: false, priority: 1, repeat: "daily" },
    { id: "7", label: "Attend meeting with team", done: true, priority: 2, repeat: "none" },
    { id: "8", label: "Buy coffee", done: false, priority: 3, repeat: "weekly" },
    { id: "9", label: "Prepare dinner", done: true, priority: 1, repeat: "daily" },
    { id: "10", label: "Send email to boss", done: false, priority: 2, repeat: "none" },
    { id: "11", label: "Read a book", done: false, priority: 1, repeat: "none" },
    { id: "12", label: "Take vitamins", done: true, priority: 3, repeat: "daily" },
    { id: "13", label: "Schedule doctor's appointment", done: false, priority: 2, repeat: "none" },
    { id: "14", label: "Clean the bathroom", done: true, priority: 3, repeat: "weekly" },
    { id: "15", label: "Pick up laundry", done: false, priority: 2, repeat: "weekly" },
    { id: "16", label: "Water the plants", done: true, priority: 2, repeat: "weekly" },
    { id: "17", label: "Update website", done: false, priority: 1, repeat: "monthly" },
    { id: "18", label: "Buy new shoes", done: false, priority: 3, repeat: "none" },
    { id: "19", label: "Fix the fence", done: true, priority: 1, repeat: "none" },
    { id: "20", label: "Study for the exam", done: false, priority: 2, repeat: "none" }
  ];
  
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as "active" | "completed" | "repeated" | null;

  let filteredTasks = tasks.filter(task => {
    switch (status) {
        default:
      case "active":
        return !task.done;
      case "completed":
        return task.done;
      case "repeated":
        return task.repeat !== "none";
    }
  });

  if (status === "active") {
    filteredTasks = filteredTasks.sort((a, b) => a.priority - b.priority);
  }
  if (status === "repeated") {
    filteredTasks = filteredTasks.sort((a, b) => {
        if (a.done === b.done) {
          return a.priority - b.priority; 
        }
        return b.done ? -1 : 1;
      });
  }

  return NextResponse.json(filteredTasks, { status: 200 });
}
