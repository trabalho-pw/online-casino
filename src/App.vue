<script setup>
import { RouterView } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'
import NotificationPopup from '@/components/NotificationPopup.vue'

const notificationStore = useNotificationStore()
</script>

<template>
  <div class="main">
    <NotificationPopup
    v-if="notificationStore.showNotification"
    :type="notificationStore.notificationType"
    :message="notificationStore.notificationMessage"
    @close="notificationStore.closeNotification"
    />
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  width: 100vw;
}
</style>
