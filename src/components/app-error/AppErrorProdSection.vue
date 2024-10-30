<script setup lang="ts">
const props = defineProps<{
  message: string,
  customCode: number,
  hint: string | null,
  details: string,
  isCustomError: boolean,
  statusCode: number,
}>()

const error = ref({
  msg: 'Ops! Something went wrong.',
  code: 500,
})

if (props.isCustomError) {
  error.value.msg = props.message
  error.value.code = props.customCode
}

if (props.statusCode === 406) {
  error.value.msg = 'Sorry, this page is not available.'
  error.value.code = 404
}

</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ error.code }}</h1>
    <p class="error__msg">{{ error.msg }}</p>
    <div class="error-footer">
      <p class="error-footer__text">
        You'll find lots to explore on the home page.
      </p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
