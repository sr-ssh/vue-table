<template>
  <div>
    <input v-model="localFilters.name" placeholder="Filter by Name" @input="applyFilters" />
    <select v-model="localSearchType.searchType" @change="applyFilters">
      <option :value="SearchTypeEnum.CASE_SENSITIVE">Case-Sensitive</option>
      <option :value="SearchTypeEnum.PARTIAL_MATCH">Partial Match</option>
      <option :value="SearchTypeEnum.REGEX">Regex</option>
      <option :value="SearchTypeEnum.NONE">None</option>
    </select>
    <input
      v-model="localFilters.phone"
      placeholder="Filter by Phone Number"
      @input="applyFilters"
    />
    <input v-model="localFilters.address" placeholder="Filter by Address" @input="applyFilters" />
  </div>
</template>

<script lang="ts" setup>
// import type { SearchTypeEnum } from '@/@types/UserTypes'
import { reactive, defineProps, defineEmits } from 'vue'

enum SearchTypeEnum {
  CASE_SENSITIVE = 'caseSensitive',
  PARTIAL_MATCH = 'partialMatch',
  REGEX = 'regex',
  NONE = 'none'
}

const props = defineProps<{
  searchType: SearchTypeEnum
  filters: {
    name: string
    phone: string
    address: string
  }
}>()

const localFilters = reactive({ ...props.filters })
const localSearchType = reactive({ searchType: props.searchType })

const emit = defineEmits<{
  (
    e: 'applyFilters',
    newFilters: typeof props.filters,
    newSearchType: typeof props.searchType
  ): void
}>()

const applyFilters = () => {
  emit('applyFilters', localFilters, localSearchType.searchType)
}
</script>
