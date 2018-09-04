<template>
  <p class="paragraph">{{ text }}</p>
</template>

<script>
  export default {
    props: ['text'],
  }
</script>

<style>
  .paragraph {
    text-align: center;
    font-size: .9em;
    font-style: italic;
  }
</style>