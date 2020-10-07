<template>
    <v-list two-line>
        <v-subheader>DONE</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group v-if="doneTasks">
            <template v-for="(task, index) in doneTasks.tasks" >
                <v-list-item v-if="doneTasks.tasks.length - 1 > index" :key="task.id" >
                    <v-list-item-content>
                        <v-list-item-title>{{task.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{task.content}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-icon color="green lighten-1">mdi-check</v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-list-item v-else :key="task.id" v-intersect="loadDataDoneTask" >
                    <v-list-item-content>
                        <v-list-item-title>{{task.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{task.content}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-icon color="green lighten-1">mdi-check</v-icon>
                    </v-list-item-action>
                </v-list-item>
            </template>
        </v-list-item-group>
    </v-list>
</template>

<script>
export default {
    props: ['doneTasks'],
    methods: {
        loadDataDoneTask(entries, observer, isIntersecting) {
            if (!isIntersecting) return;
            if (this.doneTasks.taskCount == 0 || this.doneTasks.tasks.length === this.doneTasks.taskCount) return;

            this.$emit('loadDataDoneTask');
        }
     }
}
</script>