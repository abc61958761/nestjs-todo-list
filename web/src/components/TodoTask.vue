<template>
    <v-list two-line>
        <v-subheader>TO-DO</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group v-if="todoTasks">
            <template v-for="(task, index) in todoTasks.tasks">
                <v-list-item v-if="todoTasks.tasks.length - 1 > index" :key="task._id">
                    <v-list-item-content>
                        <v-list-item-title>{{task.user.name}} : {{task.title}} </v-list-item-title>
                        <v-list-item-subtitle>{{task.content}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
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
                    </v-list-item-action>
                </v-list-item>

                <v-list-item v-else :key="task.id" v-intersect="loadDataTodoTask" >
                    <v-list-item-content>
                        <v-list-item-title>{{task.user.name}} : {{task.title}} </v-list-item-title>
                        <v-list-item-subtitle>{{task.content}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
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
                    </v-list-item-action>
                </v-list-item>
            </template>
        </v-list-item-group>
    </v-list>
</template>

<script>
export default {
    props: ['todoTasks'],
    methods: {
        loadDataTodoTask(entries, observer, isIntersecting) {
            if (!isIntersecting) return;
            if (this.todoTasks.taskCount == 0 || this.todoTasks.tasks.length === this.todoTasks.taskCount) return;

            this.$emit('loadDataTodoTask');
        },
        updateTask(args, _id) {
            this.$emit('updateTask', { ...args, _id });
        }
     }
}
</script>