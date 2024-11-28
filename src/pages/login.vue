<script setup lang="ts">
import type { LoginForm } from '@/types/AuthForm'
import { login } from '@/utils/supabaseAuth'
import { watchDebounced } from '@vueuse/core'

const formData = ref({
  email: '',
  password: '',
})

const { serverError, handleServerError, realtimeErrors, handleLoginForm } =
  useFormErrors<LoginForm>()

watchDebounced(
  formData,
  () => {
    handleLoginForm(formData.value)
  },
  { debounce: 300, deep: true },
)

const router = useRouter()

const signin = async () => {
  const { error } = await login(formData.value)
  if (!error) return router.push('/')

  handleServerError(error)
}
</script>

<template>
  <div
    class="mx-auto -mt-20 flex min-h-[90vh] w-full items-center justify-center p-10 text-center"
  >
    <Card class="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-4 flex flex-col items-center justify-center gap-4">
          <Button variant="outline" class="w-full">
            Register with Google
          </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              :class="{ 'border-red-500': serverError }"
            />
            <ul
              class="text-left text-sm text-red-500"
              v-if="realtimeErrors?.email?.length"
            >
              <li
                v-for="error in realtimeErrors.email"
                :key="error"
                class="list-disc"
              >
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-xs underline">
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              autocomplete
              required
              v-model="formData.password"
              :class="{ 'border-red-500': serverError }"
            />
            <ul
              class="text-left text-sm text-red-500"
              v-if="realtimeErrors?.password?.length"
            >
              <li
                v-for="error in realtimeErrors.password"
                :key="error"
                class="list-disc"
              >
                {{ error }}
              </li>
            </ul>
          </div>
          <ul class="text-left text-sm text-red-500" v-if="serverError">
            <li class="list-disc">{{ serverError }}</li>
          </ul>
          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
