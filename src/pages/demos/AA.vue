<script setup>
const domRef = ref()
const router = useRouter()

onMounted(() => {
  console.log(domRef.value, '1111')
})
</script>

<template lang="">
  <div ref="domRef" />
  <div>
    <button m-3 mt-8 text-sm btn @click="router.back()">
      Back
    </button>
  </div>
</template>

<style lang="">

</style>
