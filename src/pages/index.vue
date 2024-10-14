<script setup lang="ts" generic="T extends any, O extends any">
import { demoNameList } from '~/pages/constant.ts'

defineOptions({
  name: 'IndexPage',
})

const name = ref('')

const router = useRouter()
function go(name) {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)

  else
    router.push(`/demos/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div>
    <TheInput v-model="name" placeholder="What's your name?" autocomplete="false" @keydown.enter="go" />

    <div>
      <button class="m-3 text-sm btn" :disabled="!name" @click="go">
        Go
      </button>
    </div>

    <div flex="~ gap3 wrap" items-center justify-center>
      <div
        v-for="demoName in demoNameList"
        :key="demoName"
        flex="~ wrap" h-40 w-40 items-center justify-center rounded-full bg-red-500
        text-2xl
        text-white
        :className="demoName"
        @click="go(demoName)"
      >
        {{ demoName }}
      </div>
    </div>
  </div>
</template>
