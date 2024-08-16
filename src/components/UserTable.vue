<template>
  <div class="table-container">
    <Filters :filters="filters" @applyFilters="applyFilters" />
    <table class="responsive-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th @click="sortBy('name')">
            <div class="th-icon">
              Name <AscSortIcon v-if="sortKey === 'name' && sortOrder === 1" /><DescSortIcon
                v-if="sortKey === 'name' && sortOrder === -1"
              />
            </div>
          </th>
          <th @click="sortBy('date')">
            <div class="th-icon">
              Date of Registration<AscSortIcon
                v-if="sortKey === 'date' && sortOrder === 1"
              /><DescSortIcon v-if="sortKey === 'date' && sortOrder === -1" />
            </div>
          </th>
          <th>Address</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="user in paginatedUsers" :key="user.id" :user="user" />
      </tbody>
    </table>
    <Pagination :totalItems="filteredUsers.length" @changePage="changePage" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import Filters from './TableFilters.vue'
import TableRow from './TableRow.vue'
import Pagination from './TablePagination.vue'
import AscSortIcon from './icons/AscSortIcon.vue'
import DescSortIcon from './icons/DescSortIcon.vue'
import type { UserType } from '@/@types/UserTypes'

// Data and state
const users = ref<UserType[]>([]) // Populate this with your data
const filters = ref({
  name: '',
  phone: '',
  address: ''
})
const sortKey = ref<keyof UserType | ''>('')
const sortOrder = ref<number>(1) // 1 for ascending, -1 for descending
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(10)

const fetchUserData = async () => {
  try {
    const response = await fetch('/records.json')
    users.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return (
      user.name.toLowerCase().includes(filters.value.name.toLowerCase()) &&
      user.phone.includes(filters.value.phone) &&
      user.address.toLowerCase().includes(filters.value.address.toLowerCase())
    )
  })
})

const sortedUsers = computed(() => {
  return filteredUsers.value.slice().sort((a, b) => {
    if (sortKey.value) {
      let result = a[sortKey.value] > b[sortKey.value] ? 1 : -1
      return result * sortOrder.value
    }
    return 0
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return sortedUsers.value.slice(start, start + itemsPerPage.value)
})

// Methods
const sortBy = (key: keyof UserType) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1
  } else {
    sortOrder.value = 1
  }
  sortKey.value = key
  updateQueryParams()
}

const applyFilters = (newFilters: typeof filters.value) => {
  filters.value = newFilters
  currentPage.value = 1
  updateQueryParams()
}

const changePage = (page: number) => {
  currentPage.value = page
  updateQueryParams()
}

// Watchers for URL state preservation
watch(
  [filters, sortKey, sortOrder, currentPage],
  () => {
    updateQueryParams()
  },
  { deep: true }
)

// Functions for URL state management
const updateQueryParams = () => {
  const query = new URLSearchParams(window.location.search)
  query.set('name', filters.value.name)
  query.set('phone', filters.value.phone)
  query.set('address', filters.value.address)
  query.set('sortKey', sortKey.value)
  query.set('sortOrder', sortOrder.value.toString())
  query.set('page', currentPage.value.toString())
  query.set('itemsPerPage', itemsPerPage.value.toString())

  const newUrl = `${window.location.pathname}?${query.toString()}`
  window.history.pushState({}, '', newUrl)
}

const loadFromQueryParams = () => {
  const query = new URLSearchParams(window.location.search)
  filters.value.name = query.get('name') || ''
  filters.value.phone = query.get('phone') || ''
  filters.value.address = query.get('address') || ''
  sortKey.value = (query.get('sortKey') || '') as any
  sortOrder.value = query.get('sortOrder') ? Number(query.get('sortOrder')) : 1
  currentPage.value = query.get('page') ? Number(query.get('page')) : 1
  itemsPerPage.value = query.get('itemsPerPage') ? Number(query.get('itemsPerPage')) : 10
}

// Load state from URL on mount
onMounted(() => {
  loadFromQueryParams()
  fetchUserData()
})
</script>

<style src="../assets/styles/userTable.css"></style>
