<script>
export default {
    name: "GenericButton",
  props: {
    text: {
      type: String,
      default: 'Enviar',
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'submit',
    },
  },
}
</script>

<template>
  <div class="generic-button">
    <button :disabled="!isValid" :type="type">
      {{ text }}
    </button>
  </div>
</template>

<style scoped>
.generic-button {
  height: 2.5em;
  min-width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.generic-button button {
  height: 100%;
  width: 100%;
  color: white;
  background-color: #e63948;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: "Bebas Neue", sans-serif;
  border: none;
  border-radius: 10px;
  transition: 0.2s ease;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.generic-button button:hover {
  scale: 1.03;
  cursor: pointer;
}

.generic-button button:active {
  scale: 1;
}

.generic-button button:disabled {
  background: #989898;
  transition: none;
  scale: 1;
  cursor: default;
}
</style>
