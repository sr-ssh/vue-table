<template>
  <div>
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = defineProps<{
  totalItems: number
}>()

const currentPage = ref(1)
const itemsPerPage = ref(10)

const totalPages = computed(() => Math.ceil(props.totalItems / itemsPerPage.value))

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    emit('changePage', currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emit('changePage', currentPage.value)
  }
}

const emit = defineEmits<{
  (e: 'changePage', page: number): void
}>()
</script>
