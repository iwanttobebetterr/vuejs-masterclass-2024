<script setup lang="ts">
import usePageStore from '@/stores/page'
import {
  tasksWithProjectsQuery,
  type TaskWithProjects,
} from '@/utils/supabase-queries'
import { columns } from '@/utils/table-columns/task-columns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TaskWithProjects | null>(null)
const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  if (error) useErrorStore().setError({ error, errorCode: status })

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
