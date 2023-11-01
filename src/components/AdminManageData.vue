<script setup>
defineProps({
  user: {
    type: Object,
    default: () => {}
  }
});
function checkIfAdmin(email) {
  if (email === 'alshammat51@gmail.com') {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <div v-if="user && checkIfAdmin(user.email)"></div>
</template>
