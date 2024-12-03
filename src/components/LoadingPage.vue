<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div v-if="loading" class="loading-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loading-container {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  z-index: 10000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #deb45fa2;
  border-top: 6px solid var(--c-purple);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
