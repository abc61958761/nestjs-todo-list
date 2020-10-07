import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './models/task.model';
import { TaskInput } from './input/task.input';
import { UpdateTaskArgs } from './args/task.update.args';
import { TaskArgs } from './args/task.args';
import { TaskStatus } from './enums/task.status.enum';

 @Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private readonly taskModel: Model<Task>
    ) {}

    createTask(taskData: TaskInput) {
        const newTask = new this.taskModel({ ...taskData, status: 'WAITING'});
        
        return newTask.save();
    }

    updateTask(_id: String, args: UpdateTaskArgs) {
        return this.taskModel.findByIdAndUpdate(_id, {
            ...args,
            updatedAt: new Date
        }, { new: true });
    }

    queryTasks(args: TaskArgs, status: TaskStatus) {
        const tasks = this.taskModel.find()
            .where('active').equals(true)
            .sort('createdAt')
            .skip(args.start)
            .limit(args.pageSize);

        if (status) {
            tasks.where('status').equals(status)
        }

        return tasks.exec();
    }

    taskCount(args: TaskArgs, status: TaskStatus) {
        const tasks = this.taskModel.find()
            .where('active').equals(true)

        if (status) {
            tasks.where('status').equals(status)
        }

        return tasks.countDocuments().exec();
    }

}
