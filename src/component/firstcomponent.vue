<template>
  <div id="firstcomponent" class="component-txt">
    <h1>This is my first component, written by {{ author }} </h1>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        author: "xuya"
      }
    }
  }
</script>
