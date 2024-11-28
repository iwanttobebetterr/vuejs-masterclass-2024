<script setup lang="ts">
const links = [
  { title: 'Dashboard', icon: 'lucide:house', to: '/' },
  { title: 'Projects', icon: 'lucide:building-2', to: '/projects' },
  { title: 'My Tasks', icon: 'lucide:badge-check', to: '/tasks' },
]

const accountLinks = [
  { title: 'Profile', icon: 'lucide:user', to: '/profile' },
  { title: 'Settings', icon: 'lucide:settings', to: '/settings' },
  { title: 'Sign out', icon: 'lucide:log-out' },
]

const router = useRouter()

const executelinkClicked = async (linkTitle: string) => {
  if (linkTitle === 'Sign out') {
    const { logout } = await import('@/utils/supabaseAuth')
    if (await logout()) {
      router.push('/login')
    }
  }
}
</script>

<template>
  <aside
    class="fixed flex h-screen w-16 flex-col gap-2 border-r bg-muted/40 transition-[width] lg:w-52"
  >
    <div
      class="flex h-16 shrink-0 items-center justify-between gap-1 border-b px-2 lg:px-4"
    >
      <Button variant="outline" size="icon" class="h-8 w-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <Button variant="outline" size="icon" class="h-8 w-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="relative flex h-full flex-col justify-between gap-2">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y bg-background py-3 text-center">
        <SidebarLinks :links="accountLinks" @linkClicked="executelinkClicked" />
      </div>
    </nav>
  </aside>
</template>
