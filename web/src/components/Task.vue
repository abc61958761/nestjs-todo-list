<template>
    <div class="task">
        <TodoTask :todoTasks=todoTasks :todoTaskArgs=todoTaskArgs 
            @loadDataTodoTask="loadDataTodoTask" 
            @updateTask="updateTask"
        />
        <DoneTask :doneTasks=doneTasks :doneTaskArgs=doneTaskArgs @loadDataDoneTask="loadDataDoneTask" />
            
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
import TodoTask from './TodoTask';
import DoneTask from './DoneTask';

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
    components: { TodoTask, DoneTask },
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
        async updateTask(data) {
            await this.$apollo.mutate({
                mutation: UPDATE_TASK,
                variables: data
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
        loadDataTodoTask(entries) {
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