<template>
  <div class="icon-demo">
    <span class="icon-item" v-for="(icon, index) in AllIcons" :key="index">
      <component :is="icon" :size="24" />
    </span>
  </div>
</template>

<script>
import * as AllIcons from '../packages/vue-next/src/map';

export default {
  setup() {
    return {
      AllIcons
    };
  },
}
</script>

<style>
.icon-demo {
  display: flex;
  flex-wrap: wrap;
}
.icon-item {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
