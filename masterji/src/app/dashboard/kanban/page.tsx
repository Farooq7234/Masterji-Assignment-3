'use client'

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface Task {
  title: string;
  description: string;
  date: Date | null;
}

interface Tasks {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
}

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks>({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const [newTask, setNewTask] = useState<Task>({ title: "", description: "", date: null });
  const [date, setDate] = useState<Date | null>(null);

  // Load tasks from local storage
  useEffect(() => {
    const storedTasks: Tasks = JSON.parse(localStorage.getItem("kanbanTasks") || "{}");
    setTasks(storedTasks || { todo: [], inProgress: [], completed: [] });
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (category: keyof Tasks): void => {
    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const updatedTasks = {
      ...tasks,
      [category]: [...tasks[category], { ...newTask, date }],
    };
    setTasks(updatedTasks);

    // Reset new task form
    setNewTask({ title: "", description: "", date: null });
    setDate(null);
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="font-bold text-2xl">Kanban Board</h2>
      <div className="pt-5 flex justify-around">
        {(["todo", "inProgress", "completed"] as Array<keyof Tasks>).map((category) => (
          <Card key={category} className="w-[30%]">
            <CardHeader>
              <CardTitle>
                {category === "todo" ? "To Do" : category === "inProgress" ? "In Progress" : "Completed"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tasks[category].map((task, index) => (
                <div key={index} className="mb-2 p-2 border rounded">
                  <h4 className="font-bold">{task.title}</h4>
                  <p>{task.description}</p>
                  <p className="text-sm text-muted-foreground">{task.date ? format(new Date(task.date), "PPP") : "No Date"}</p>
                </div>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <Plus /> Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                      Please Enter the details for the new task below
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date || undefined}
                          onSelect={(selectedDate) => {
                            setNewTask({ ...newTask, date: selectedDate || null });
                            setDate(selectedDate || null);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => addTask(category)}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
