<script>
export default {
  name: 'NotificationPopup',
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 4000
    },
    type: {
      type: String,
      default: 'success'
    }
  },
  emits: ['close'],
  data() {
    return {
      visible: true
    };
  },
  computed: {
    notificationClass() {
      return `notification-popup ${this.type}`;
    }
  },
  methods: {
    showPopup() {
      this.visible = true;
      setTimeout(() => {
        this.closePopup();
      }, this.duration);
    },
    closePopup() {
      this.visible = false;
      this.$emit('close');
    }
  },
  mounted() {
    this.showPopup();
  }
};
</script>

<template>
  <transition name="fade">
    <div v-if="visible" :class="notificationClass">
      <p>{{ message }}</p>
      <button @click="closePopup"><span class="close-btn">&times;</span></button>
    </div>
  </transition>
</template>

<style scoped>
.notification-popup {
  position: fixed;
  display: flex;
  align-items: center;
  width: 90%;
  height: 8%;
  font-family: 'Lato', sans-serif;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: blur(10px);
  color: #000;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 1rem;
}

.notification-popup.success {
  background-color: #e3ffe3;
  border: 1px solid #81c784;
}

.notification-popup.error {
  background-color: #ffe2e2;
  border: 1px solid #f1948a;
}

.notification-popup button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: inherit;
}

.close-btn {
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .notification-popup {
    width: 50%;
  }
}
</style>
