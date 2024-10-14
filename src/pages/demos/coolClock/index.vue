<script lang="ts" setup>
import { RAF, getHMS, initCanvas } from '../../utils'
import { drawBackGround } from './utils'

const { params } = useRoute('/demos/[name]')
const router = useRouter()

const canvasRef = ref()

onMounted(() => {
  const [h, m, s] = getHMS()
  const { ctx } = initCanvas(canvasRef.value, 1400, 600)

  drawBackGround(ctx, 1400, 600)
})
</script>

<template lang="">
  <div flex="~" items-center justify-center>
    <canvas ref="canvasRef" />
  </div>
  <div>
    <button m-3 mt-8 text-sm btn @click="router.back()">
      Back
    </button>
  </div>
</template>

  <style lang="">

  </style>
