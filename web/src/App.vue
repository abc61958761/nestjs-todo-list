<template>
  <v-app id="app">
    <Task/>
  </v-app>
</template>

<script>
import Task from './components/Task';

export default {
  name: 'App',

  components: {
    Task,
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
