<template>
  <div class="loading-container">
    <transition
      name="fade"
      mode="out-in">
      <div
        v-if="loading"
        key="1"
        class="spinner-container">
        <div class="spinner" />
      </div>
      <div
        v-else
        key="2"
        class="loading-container__content">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
export default ({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
@keyframes rotating {
  100% {
    transform: rotate(360deg);
  }
}
.spinner-container {
  display: flex;
  justify-content: center;
  margin: 40px 0;
  height: 40px;
  position: relative;
}
.spinner {
  position: absolute;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top: 3px solid #555;
  animation: rotating 1s infinite linear;
}
.loading-container__content {
  height: 100%;
}
</style>
