<template>
    <div class="task">
        <Task :taskList=todoTasks name="todo"
            @loadDataTodoTask="loadDataTodoTask">
            <template v-slot:title>TO-DO</template>
            <template v-slot:action="{ task }">
                <v-menu bottom left >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn dark icon v-bind="attrs" color="primary" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="updateTask({ status: 'DONE'}, task._id)">
                            <v-list-item-title>DONE</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="updateTask({ active: false }, task._id)">
                            <v-list-item-title>DELETE</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </Task>

        <Task :taskList=doneTasks name="done"
            @loadDataDoneTask="loadDataDoneTask">
            <template v-slot:title>DONE</template>
            <template v-slot:action>
                <v-icon color="green lighten-1">mdi-check</v-icon>
            </template>
        </Task>
                    
        <v-fab-transition>
            <v-btn
                fab
                large
                bottom
                right
                fixed
                dark
                color="orange darken-2" @click="addTaskDialog = true"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>
        <v-dialog persistent v-model="addTaskDialog" max-width="400">
            <v-card>
                <v-card-title>
                    <span>New Task</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="addTaskDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field label="Name" v-model="newTask.title"></v-text-field>
                    <v-textarea hide-details outlined v-model="newTask.content"></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange" text @click="createTask">
                        CREATE
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { TODO_TASKS, DONE_TASKS, UPDATE_TASK, CREATE_TASK } from '../schemas/Task';
import Task from '../components/Task';

export default {
    data: () => {
        return {
            addTaskDialog: false,
            newTask: {
                title: null,
                content: null
            },
            initPageArgs: {
                start: 0,
                pageSize: 10,
                page: 0
            },
            doneTaskArgs: {},
            todoTaskArgs: {}
        }
    },
    components: { Task },
    created() {
        Object.assign(this.doneTaskArgs, this.initPageArgs);
        Object.assign(this.todoTaskArgs, this.initPageArgs);
    },
    methods: {
        createTask() {
            this.$apollo.mutate({
                mutation: CREATE_TASK,
                variables: {
                    taskData: this.newTask
                },
                update: () => {
                    this.addTaskDialog = false;
                    this.$apollo.queries.todoTasks.refetch()
                    Object.assign(this.todoTaskArgs, this.initPageArgs);

                    this.newTask = {
                        title: null,
                        content: null
                    }
                }
            })
        },
        async updateTask(args, _id) {
            await this.$apollo.mutate({
                mutation: UPDATE_TASK,
                variables: { ...args, _id }
            })
            this.$apollo.queries.todoTasks.refetch()
            this.$apollo.queries.doneTasks.refetch()

            Object.assign(this.doneTaskArgs, this.initPageArgs);
            Object.assign(this.todoTaskArgs, this.initPageArgs);
        },
        loadDataDoneTask() {
            const currentPageCount = this.doneTaskArgs.pageSize * this.doneTaskArgs.page;

            this.doneTaskArgs.start = currentPageCount + this.doneTaskArgs.pageSize;
            this.$apollo.queries.doneTasks.fetchMore({
                // New variables
                variables: this.doneTaskArgs,
                // Transform the previous result with new data
                updateQuery: (previousResult, { fetchMoreResult, variables }) => {
                    previousResult.doneTasks.tasks.push(...fetchMoreResult.doneTasks.tasks);
                    previousResult.doneTasks.taskCount = fetchMoreResult.doneTasks.taskCount;

                    return {
                        doneTasks: previousResult.doneTasks
                    }
                },
            })

            this.doneTaskArgs.page ++;
        },
        loadDataTodoTask() {
            const currentPageCount = this.todoTaskArgs.pageSize * this.todoTaskArgs.page;

            this.todoTaskArgs.start = currentPageCount + this.todoTaskArgs.pageSize;
            this.$apollo.queries.todoTasks.fetchMore({
                // New variables
                variables: this.todoTaskArgs,
                // Transform the previous result with new data
                updateQuery: (previousResult, { fetchMoreResult, variables }) => {
                    previousResult.todoTasks.tasks.push(...fetchMoreResult.todoTasks.tasks);
                    previousResult.todoTasks.taskCount = fetchMoreResult.todoTasks.taskCount;

                    return {
                        todoTasks: previousResult.todoTasks
                    }
                },
            })

            this.todoTaskArgs.page ++;
        }
     },
     apollo: {
         todoTasks: {
            query: TODO_TASKS
        },
        doneTasks: {
            query: DONE_TASKS
        }
     }
}
</script>

<style lang="scss">
.task {
    display: flex;
    justify-content: space-around;
    flex: 1;
    height: 100vh;
    > .v-list {
        flex: 1;
        margin: 20px;

        overflow: scroll;
        .v-list-item-group {
            overflow: scroll;
        }
    }
}

</style>
