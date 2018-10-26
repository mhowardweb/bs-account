<template>
  <div class="loader">
    <div
      :style="{'background-color':color}"
      class="bounce-one"/>
    <div
      :style="{'background-color':color}"
      class="bounce-two"/>
    <div
      :style="{'background-color':color}"
      class="bounce-three"/>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#ffffff',
    },
  },
};
</script>
