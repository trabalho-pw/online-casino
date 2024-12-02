<script>
import GenericContainer from '../components/GenericContainer.vue'
import FormInput from '../components/FormInput.vue'
import GenericButton from '../components/GenericButton.vue'
import router from '@/router';

export default {
  name: 'RegisterView',
  components: {
    GenericContainer,
    FormInput,
    GenericButton,
  },
  data() {
    return {
      newUser: { name: '', email: '', password: '' },
    }
  },
  computed: {
    isFormValid() {
      return this.newUser.name != '' && this.newUser.email != '' && this.newUser.password != ''
    },
  },
  methods: {
    goToLogin() {
      router.push('/')
    }
  }
}
</script>

<template>
  <main>
    <GenericContainer title="Criar uma Conta">
      <form class="register-form">
        <div class="inputs">
          <FormInput
            type="text"
            id="name"
            label="Nome de Usuário"
            @input="(value) => (newUser.name = value)"
          />
          <FormInput
            type="email"
            id="email"
            label="Email"
            @input="(value) => (newUser.email = value)"
          />
          <FormInput
            type="password"
            id="password"
            label="Senha"
            @input="(value) => (newUser.password = value)"
          />
        </div>
        <GenericButton @click="console.log(newUser)" type="button" :isValid="isFormValid" />
        <p class="login-msg">Já possui uma conta? <button @click="goToLogin" type="button">Fazer Login</button>.</p>
      </form>
    </GenericContainer>
  </main>
</template>

<style scoped>
main {
  background: url('../assets/background-layered-peaks.svg');
  height: 100dvh;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 1em;
}

.inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}

.login-msg {
  font-family: 'Lato', sans-serif;
}

.login-msg button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #deb45f;
  text-decoration: underline;
  transition: all ease 0.15s;
}

.login-msg button:hover {
  color: #e63948;
}
</style>
