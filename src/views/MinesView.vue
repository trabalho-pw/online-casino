<template>
    <div>
        <MinesGame/>
    </div>
</template>
<script>
import MinesGame from '../components/MinesGame.vue';

export default{
    name: "MinesView",
    components: {
        MinesGame,
    },
};
</script>