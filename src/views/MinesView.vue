<template>
    <main>
        <GenericContainer title="CAMPO MINADO">
            <MinesGame/>
        </GenericContainer>
    </main>
    <footer>
        <Rodape/>
    </footer>
    
</template>
<script>
import MinesGame from '../components/MinesGame.vue';
import GenericContainer from '../components/GenericContainer.vue';
import Rodape from '@/components/Rodape.vue';

export default{
    name: "MinesView",
    components: {
        MinesGame,
        GenericContainer,
        Rodape,
    },
    
};

</script>
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