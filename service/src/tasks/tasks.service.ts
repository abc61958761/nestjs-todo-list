import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './models/task.model';
import { TaskInput } from './input/task.input';
import { UpdateTaskArgs } from './args/task.update.args';
import { TaskArgs } from './args/task.args';

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

    queryTasks(args: TaskArgs) {
        const tasks = this.taskModel.find()
            .where('active').equals(true)
            .sort('createdAt')
            .skip(args.start)
            .limit(args.pageSize);

        if (args.status) {
            tasks.where('status').equals(args.status)
        }

        return tasks.exec();
    }

}
