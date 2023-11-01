<script setup>
defineProps({
  message: String
});
</script>

<template>
  <div class="onPage">
    <h2>{{ message }}</h2>
  </div>
</template>
