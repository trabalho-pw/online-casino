<template>
    <main>
        <MinesContainer title="CAMPO MINADO">
            <MinesGame/>
        </MinesContainer>
    </main>
    <footer>
        <Rodape/>
    </footer>
    
</template>
<script>
import MinesGame from '../components/MinesGame.vue';
import Rodape from '@/components/Rodape.vue';
import MinesContainer from '@/components/MinesContainer.vue';

export default{
    name: "MinesView",
    components: {
        MinesGame,
        MinesContainer,
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