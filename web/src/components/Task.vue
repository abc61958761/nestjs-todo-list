<template>
    <v-list two-line>
        <v-subheader><slot name="title"></slot></v-subheader>
        <v-divider></v-divider>
        <v-list-item-group v-if="taskList">
            <template v-for="(task, index) in taskList.tasks">
                <v-list-item v-if="taskList.tasks.length - 1 > index" :key="task._id">
                    <v-list-item-content>
                        <v-list-item-title>{{task.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{task.content}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <slot name="action" :task="task"></slot>
                    </v-list-item-action>
                </v-list-item>

                <v-list-item v-else :key="task._id" v-intersect="loadDataTask" >
                    <v-list-item-content>
                        <v-list-item-title>{{task.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{task.content}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <slot name="action" :task="task"></slot>
                    </v-list-item-action>
                </v-list-item>
            </template>
        </v-list-item-group>
    </v-list>
</template>

<script>
export default {
    props: ['taskList', 'name'],
    methods: {
        loadDataTask(entries, observer, isIntersecting) {
            if (!isIntersecting) return;
            if (this.taskList.taskCount == 0 || this.taskList.tasks.length === this.taskList.taskCount) return;
            switch (this.name) {
                case 'todo':
                    this.$emit('loadDataTodoTask');
                    break;
                case 'done':
                    this.$emit('loadDataDoneTask');
                    break;
                default:
                    break;
            }
        }
     }
}
</script>
