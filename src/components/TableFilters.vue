<template>
  <div>
    <input v-model="localFilters.name" placeholder="Filter by Name" @input="applyFilters" />
    <input
      v-model="localFilters.phone"
      placeholder="Filter by Phone Number"
      @input="applyFilters"
    />
    <input v-model="localFilters.address" placeholder="Filter by Address" @input="applyFilters" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  filters: {
    name: string
    phone: string
    address: string
  }
}>()

const localFilters = reactive({ ...props.filters })

const emit = defineEmits<{
  (e: 'applyFilters', newFilters: typeof props.filters): void
}>()

const applyFilters = () => {
  emit('applyFilters', localFilters)
}
</script>
