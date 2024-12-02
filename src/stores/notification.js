import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notificationMessage = ref('')
  const notificationType = ref('')
  const showNotification = ref(false)

  const showNotificationMessage = (message, type) => {
    notificationMessage.value = message
    notificationType.value = type
    showNotification.value = true
  }

  const closeNotification = () => {
    showNotification.value = false
  }

  return {
    notificationMessage,
    notificationType,
    showNotification,
    showNotificationMessage,
    closeNotification
  }
})