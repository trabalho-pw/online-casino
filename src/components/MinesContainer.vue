<template>
    <div class="mines-container">
      <div class="mines-header">
        <div v-show="showLogo" class="logo">
          <img src="../assets/gold-coin.svg" alt="">
          <h1>betgalaxy</h1>
        </div>
        <h1 class="title">{{ title }}</h1>
      </div>
      <div class="mines-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MinesContainer',
    props: {
      title: {
        type: String,
        default: '',
      },
      showLogo: {
        type: Boolean,
        default: false,
      }
    },
  }
  </script>
  
  <style scoped>
  .mines-container {
    gap: 1em;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    width: 90%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
    box-shadow: 0 2px 4px 4px #00000040;
  }
  
  .mines-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75em;
    width: 100%;
    padding: 0 2em;
  }
  
  .mines-header .logo {
    width: 90%;
    font-family: "Bebas Neue", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5em;
    color: #DEB45F;
  }
  
  .mines-header .logo img {
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
  
  .mines-content {
    height: 100%;
    width: 100%;
  }
  
  @media screen and (min-width: 800px) and (max-height: 500px) {
    .mines-container {
      padding-top: 1em;
    }
  
    .title {
      font-size: 2rem;
    }
  }
  
  @media screen and (min-width: 800px) {
    .mines-container {
      height: 97%;
      width: 60%;
    }
  
    .mines-header .logo {
      justify-content: left;
    }
  }
  
  @media screen and (min-width: 1240px) {
    .mines-container {
      width: 35%;
    }
  
    .title {
      font-size: 2.5rem;
    }
  }
  </style>