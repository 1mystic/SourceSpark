<template>
  <div class="default-avatar" :style="{ width: size + 'px', height: size + 'px' }">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
      <path d="M12 14.5C6.99 14.5 3 17.86 3 22H21C21 17.86 17.01 14.5 12 14.5Z" fill="currentColor"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'DefaultAvatar',
  props: {
    size: {
      type: Number,
      default: 40
    }
  }
};
</script>

<style scoped>
.default-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-bg);
  border-radius: 50%;
  color: var(--text-muted);
}

.default-avatar svg {
  width: 60%;
  height: 60%;
}
</style> 