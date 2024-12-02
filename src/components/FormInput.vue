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
    modelValue: {
      type: String,
      default: '',
    },
    validationSchema: {
      type: Object,
      required: false,
    },
  },
  emits: ['input', 'validation-error'],
  data() {
    return {
      value: this.modelValue,
      error: '',
    }
  },
  watch: {
    value(newValue) {
      this.validateInput(newValue)
    },
  },
  methods: {
    validateInput(value) {
      if (!this.validationSchema) {
        this.error = ''
        this.$emit('validation-error', null)
        this.$emit('input', value)
        return
      }

      try {
        this.validationSchema.parse(value)
        this.error = ''
        this.$emit('validation-error', null)
        this.$emit('input', value)
      } catch (validationError) {
        this.error = validationError.errors[0].message
        this.$emit('validation-error', this.error)
        this.$emit('input', '')
      }
    },
  },
}
</script>

<template>
  <div :class="'form-input'">
    <label :for="id" :class="{ 'has-error': error }"> {{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :id="id"
      :name="id"
      v-model="value"
      :class="{ 'has-error': error }"
    />
    <p class="error-msg">{{ error }}</p>
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

input.has-error {
  border-color: #e63948;
}

label.has-error {
  color: #e63948;
}

.form-input .error-msg {
  color: #e63948;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 1.5em;
}
</style>
