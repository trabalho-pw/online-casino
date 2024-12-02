<template>
  <div class="carta">
    <div class="valor">{{ carta.valor }}</div>
    <div class="naipe">{{ carta.naipe }}</div>
  </div>
</template>

<script>
export default {
  props: {
    carta: Object
  }
};
</script>

<style scoped>
.carta {
  display: inline-block;
  width: 80px;
  height: 120px;
  margin: 10px;
  background-color: white;
  border-radius: 8px;
  text-align: center;
  padding-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  font-size: 18px;
  font-weight: bold;
}

.valor {
  font-size: 22px;
  margin-bottom: 5px;
}

.naipe {
  font-size: 16px;
  color: #444;
}
</style>
