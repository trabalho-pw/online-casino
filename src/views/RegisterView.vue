<script>
  import GenericContainer from '../components/GenericContainer.vue'

  export default{
      name: "RegisterView",
      components: {
        GenericContainer,
      },
  };
</script>

<template>
  <main>
    <GenericContainer title="Criar uma Conta">
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
</style>