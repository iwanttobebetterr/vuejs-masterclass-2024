<script setup lang="ts">
import usePageStore from '@/stores/page'
import { columns } from '@/utils/table-columns/projectColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoaderStore = useProjectsLoaderStore()
const { projects } = storeToRefs(projectsLoaderStore)

await projectsLoaderStore.getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
