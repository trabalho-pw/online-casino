<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  emits: ['input'],
}
</script>

<template>
  <div class="form-input">
    <label :for="id"> {{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :id="id"
      :name="id"
      @input="$emit('input', $event.target.value)"
    />
    <p class="error-msg"></p>
  </div>
</template>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
  width: 80%;
  font-family: 'Lato', sans-serif;
  color: #223f4a;
}

.form-input label {
  font-size: 1.25em;
  font-weight: 500;
}

.form-input input {
  width: 100%;
  height: 2.25em;
  border-radius: 2px;
  border: solid 1px #223f4a;
  padding-inline: 8px;
}

.form-input .error-msg {
  color: #e63948;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 1.5em;
}
</style>
