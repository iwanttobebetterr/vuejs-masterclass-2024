import { projectsQuery, type Projects } from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsLoaderStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          return
        }

        loadProjects.delete('projects')
        if (!error && data) projects.value = data
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) if (error) useErrorStore().setError({ error, errorCode: status })

    if (data) projects.value = data

    validateCache()
  }

  return {
    projects,
    getProjects,
  }
})
