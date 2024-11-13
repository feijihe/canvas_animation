<script lang="ts" setup>
import { ref } from 'vue'
import { file2base64 } from './utils'
import type { Selection, SelectionDirection, SelectionRange } from './type'

interface MdEditorProps {
  renderHtml: (text: string) => string
  plugins: any[]
}

const props = defineProps<MdEditorProps>()

const text = ref('')
const html = ref('')
const composing = ref(false)
const inputNode = ref<HTMLTextAreaElement>()

function onChange() {
  const _html = props.renderHtml(text.value)
  console.log('_html: ', _html, composing.value)

  if (!composing.value)
    html.value = _html
}

function onCompositionStart() {
  composing.value = true
}

function onCompositionEnd() {
  composing.value = false

  const _html = props.renderHtml(text.value)
  html.value = _html
}

function onPaste(e: ClipboardEvent) {
  // const clipboardData = e.clipboardData || window.Clipboard
  const items = e!.clipboardData!.items

  if (items) {
    e.preventDefault()
    uploadDataTransfer(items)
  }
}

function uploadDataTransfer(items: DataTransferItemList) {
  const p: Promise<string>[] = Array.from(items, (item) => {
    const type = item.type
    if (item.kind === 'file' && type.includes('image')) {
      const file = item.getAsFile()!

      return new Promise(resolve =>
        file2base64(file).then(base64 => resolve(`![${type}](${base64})`),
        ),
      )
    }
    else {
      return new Promise(resolve => item.getAsString(resolve))
    }
  })

  Promise.all(p).then((res) => {
    const selection = getSelection()
    const text = res.join('')

    insertText(text, true, {
      start: selection.start + text.length,
      end: selection.start + text.length,
    })
  })
}

/**
 * set text
 * @param {string} value
 * @param {SelectionRange} newSelection
 */
function setText(value: string, newSelection?: SelectionRange) {
  const _text = value.replace(/↵/g, '\n')
  if (text.value === _text)
    return

  text.value = _text

  if (newSelection) {
    setSelection(newSelection)
  }
}

/**
 * set html
 * @param html
 */
function setHtml(html: string) {}

function insertText(value: string, replaceSelection = false, newSelection?: SelectionRange) {
  const selection = getSelection()

  const { start, end } = selection
  const before = text.value.slice(0, start)
  const after = replaceSelection ? text.value.slice(end) : text.value.slice(start)
  const newText = before + value + after
  const _selection = newSelection
    ? {
        start: newSelection.start + newText.length,
        end: newSelection.end + newText.length,
      }
    : {
        start,
        end,
      }

  setText(newText, _selection)
}

function getSelection(): Selection {
  const selection = window.getSelection()!
  const text = selection.toString()
  const { selectionStart, selectionEnd } = inputNode.value!

  return { start: selectionStart, end: selectionEnd, text }
}

function setSelection(selction: SelectionRange, selectionDirection: SelectionDirection = 'forward'): void {
  inputNode.value!.setSelectionRange(selction.start, selction.end, selectionDirection)
}

watch(() => text.value, onChange)
</script>

<template>
  <div class="vc-md-editor">
    <div class="vc-md-navigation visible">
      <butto @click="onChange">
        an
      </butto>
    </div>
    <div class="vc-md-editor-container">
      <section class="section section-md visible">
        <textarea
          ref="inputNode"
          v-model="text" name="textarea" class="section-input container" wrap="wrap"
          @compositionstart="onCompositionStart"
          @compositionend="onCompositionEnd"
          @paste="onPaste"
        />
      </section>
      <section class="section section-html visible">
        <div v-if="typeof html === 'string'" class="section-wrap custom-html-style container" v-html="html" />
        <div v-else class="section-wrap custom-html-style container">
          {{ html }}
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="less">
.show {
  height: 20px;
  padding: 0 8px;
  background: #f5f5f5;
}

/* .visible {

} */

.hide {
  display: none;
}

.vc-md-editor {
  border: 1px solid #e0e0e0;
  position: relative;
  height: 100%;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;

  .vc-md-navigation {
    min-height: 38px;
    padding: 0 8px;
    background: #f5f5f5;
  }

  .vc-md-editor-container {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    position: relative;

    .section {
      display: block;
      unicode-bidi: isolate;
    }

    .section-md,
    .section-html {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    .section-input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      border: none;
      resize: none;
      outline: none;
      padding: 10px;
      font-size: 14px;
      font-family: 'Microsoft YaHei';
      line-height: 1.5;
      color: #333;
      background: #fff;
    }

    .container {
      padding: 10px 15px 15px;
    }

    .section-wrap {
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
    }

    // .custom-html-style {
    //   text-align: left !important;
    // }
  }
}
</style>
