<script setup lang="ts">
import usePageStore from '@/stores/page'
import { projectsQuery, type Projects } from '@/utils/supabase-queries'
import { columns } from '@/utils/table-columns/project-columns'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)
const getProjects = async () => {
  const { data, error, status } = await projectsQuery

  if (error) if (error) useErrorStore().setError({ error, errorCode: status })

  projects.value = data
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
