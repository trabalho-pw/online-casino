<script>
import GenericContainer from '../components/GenericContainer.vue'
import FormInput from '../components/FormInput.vue'
import GenericButton from '../components/GenericButton.vue'
import router from '@/router'
import { z } from 'zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useNotificationStore } from '@/stores/notification'

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
      notificationStore: useNotificationStore(),
      emailSchema: z.string().email('Formato de e-mail inválido'),
      passwordSchema: z
        .string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres.')
        .regex(/[A-Z]/, 'A senha deve conter ao menos 1 letra maiúscula.')
        .regex(/[a-z]/, 'A senha deve conter ao menos 1 letra minúscula.')
        .regex(/\d/, 'A senha deve conter ao menos 1 número.')
        .regex(/[^A-Za-z0-9]/, 'A senha deve conter ao menos 1 caractere especial.'),
      usernameSchema: z
        .string()
        .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres.')
        .max(20, 'O nome de usuário deve ter no máximo 20 caracteres.'),
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
    },
    async register() {
      const db = getFirestore()

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.newUser.email,
          this.newUser.password,
        )

        const uid = userCredential.user.uid

        await setDoc(doc(db, 'users', uid), {
          name: this.newUser.name,
          email: this.newUser.email,
        })

        this.notificationStore.showNotificationMessage('Conta criada com sucesso!', 'success')
        router.push('/')
      } catch (error) {
        this.notificationStore.showNotificationMessage('Algo deu errado. Tente novamente mais tarde.', 'error')
        console.log(error.message)
      }
    },
  },
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
            :validationSchema="usernameSchema"
            @input="(value) => (newUser.name = value)"
          />
          <FormInput
            type="email"
            id="email"
            label="Email"
            :validationSchema="emailSchema"
            @input="(value) => (newUser.email = value)"
          />
          <FormInput
            type="password"
            id="password"
            label="Senha"
            :validationSchema="passwordSchema"
            @input="(value) => (newUser.password = value)"
          />
        </div>
        <GenericButton
          @click="register"
          type="button"
          :isValid="isFormValid"
          text="criar"
        />
        <p class="login-msg">
          Já possui uma conta? <button @click="goToLogin" type="button">Fazer Login</button>.
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
  justify-content: left;
  flex-direction: column;
  width: 100%;
  height: 60%;
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

@media screen and (min-width: 1024px) {
  .register-form {
    justify-content: left;
    padding-top: 10%;
  }
}
</style>
