<script lang="ts" setup>
import MarkdownIt from 'markdown-it'
import Markdowneditor from '~/components/markdownEditor/mdEditor.vue'
import '~/markdown.css'

const mdParser = new MarkdownIt({
  breaks: true,
})

const renderHtml = (text: string) => mdParser.render(text)
</script>

<template>
  <div class="hello">
    <Markdowneditor :render-html="renderHtml" />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  margin: 0 auto;
  width: 1400px;
  height: 800px;
}
</style>
