<template>
  <tr>
    <td data-label="User ID">{{ user.id }}</td>
    <td data-label="Name">{{ user.name }}</td>
    <td data-label="Date of Registration">{{ user.date }}</td>
    <td data-label="Address">{{ user.address }}</td>
    <td data-label="Phone Number">{{ user.phone }}</td>
  </tr>
</template>

<script lang="ts" setup>
import type { UserType } from '@/@types/UserTypes'

defineProps<{
  user: UserType
}>()
</script>
