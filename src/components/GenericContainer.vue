<template>
  <div class="generic-container">
    <div class="container-header">
      <div class="logo">
        <img src="../assets/gold-coin.svg" alt="">
        <h1>Logo</h1>
      </div>
      <h1 class="title">{{ title }}</h1>
    </div>
    <div class="container-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenericContainer',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.generic-container {
  gap: 1em;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  width: 90%;
  height: 95%;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
  box-shadow: 0 2px 4px 4px #00000040;
}

.container-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
  width: 100%;
  padding: 0 2em;
}

.container-header .logo {
  width: 90%;
  font-family: "Bebas Neue", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5em;
  color: #DEB45F;
}

.container-header .logo img {
  width: 2.25em;
}

.title {
  display: flex;
  justify-content: center;
  width: 80%;
  font-size: 2.5rem;
  font-weight: 500;
  color: #223F4A;
  text-align: center;
  font-family: "Bebas Neue", sans-serif;
}

.container-content {
  height: 100%;
  width: 100%;
}

@media screen and (min-width: 800px) and (max-height: 500px) {
  .generic-container {
    padding-top: 1em;
  }

  .title {
    font-size: 2rem;
  }
}

@media screen and (min-width: 800px) {
  .generic-container {
    height: 90%;
    width: 60%;
  }

  .container-header .logo {
    justify-content: left;
  }
}

@media screen and (min-width: 1240px) {
  .generic-container {
    width: 35%;
  }

  .title {
    font-size: 3rem;
  }
}
</style>
