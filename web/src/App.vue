<template>
  <v-app id="app">
    <TaskList/>
  </v-app>
</template>

<script>
import TaskList from './views/TaskList';

export default {
  name: 'App',

  components: {
    TaskList,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
#app {
  height: 100vh;
  font-family: 'Noto Sans TC';
}
</style>
