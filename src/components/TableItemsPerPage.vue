<template>
  <div>
    <input
      v-model="localPerPage.itemsPerPage"
      placeholder="Entities per page"
      @input="changeItemsCount"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  itemsPerPage: number
}>()

const localPerPage = reactive({ ...props })

const emit = defineEmits<{
  (e: 'changeItemsPerPage', newPerPage: number): void
}>()

const changeItemsCount = () => {
  emit('changeItemsPerPage', localPerPage.itemsPerPage)
}
</script>
