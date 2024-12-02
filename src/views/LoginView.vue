<script>
import GenericContainer from '../components/GenericContainer.vue'
import FormInput from '../components/FormInput.vue'
import GenericButton from '../components/GenericButton.vue'
import router from '@/router'
import { z } from 'zod'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default {
  name: 'RegisterView',
  components: {
    GenericContainer,
    FormInput,
    GenericButton,
  },
  data() {
    return {
      user: { email: '', password: '' },
      emailSchema: z.string().email('Formato de e-mail inválido'),
      passwordSchema: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    }
  },
  computed: {
    isFormValid() {
      return this.user.email != '' && this.user.password != ''
    },
  },
  methods: {
    goToRegister() {
      router.push('/register')
    },
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.user.email, this.user.password);

        const uid = userCredential.user.uid
        router.push('/' + uid)
        
        console.log('Login bem-sucedido!');
      } catch (error) {
        console.log(error.message);
      }
    }
  },
}
</script>

<template>
  <main>
    <GenericContainer title="Fazer Login">
      <form class="login-form">
        <div class="inputs">
          <FormInput
            type="email"
            id="email"
            label="Email"
            :validationSchema="emailSchema"
            @input="(value) => (user.email = value)"
          />
          <FormInput
            type="password"
            id="password"
            label="Senha"
            :validationSchema="passwordSchema"
            @input="(value) => (user.password = value)"
          />
        </div>
        <GenericButton
          @click="login"
          type="button"
          :isValid="isFormValid"
          text="Entrar"
        />
        <p class="register-msg">
          Ainda não possui uma conta?
          <button @click="goToRegister" type="button">Registrar-se</button>.
        </p>
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

.login-form {
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
  justify-content: left;
  flex-direction: column;
  width: 100%;
  height: 60%;
}

.register-msg {
  font-family: 'Lato', sans-serif;
}

.register-msg button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #deb45f;
  text-decoration: underline;
  transition: all ease 0.15s;
}

.register-msg button:hover {
  color: #e63948;
}

@media screen and (min-width: 1024px) {
  .login-form {
    justify-content: left;
    padding-top: 10%;
  }
}
</style>
