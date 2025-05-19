<template>
  <div class="default-card-image" :class="type">
    <div class="pattern-bg"></div>
    <div class="content">
      <i :class="icon"></i>
      <span class="label">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultCardImage',
  props: {
    type: {
      type: String,
      default: 'project',
      validator: value => ['project', 'hackathon'].includes(value)
    }
  },
  computed: {
    icon() {
      return this.type === 'project' ? 'fas fa-code' : 'fas fa-trophy';
    },
    label() {
      return this.type === 'project' ? 'Open Source Project' : 'Hackathon';
    }
  }
};
</script>

<style scoped>
.default-card-image {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
}

.pattern-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image: 
    linear-gradient(45deg, var(--white) 25%, transparent 25%),
    linear-gradient(-45deg, var(--white) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--white) 75%),
    linear-gradient(-45deg, transparent 75%, var(--white) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--white);
  text-align: center;
}

.content i {
  font-size: 2.5rem;
  opacity: 0.9;
}

.label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.default-card-image.hackathon {
  background: linear-gradient(135deg, var(--accent-mint) 0%, var(--accent-teal) 100%);
}

.default-card-image.hackathon .pattern-bg {
  background-image: 
    radial-gradient(circle at 25% 25%, var(--white) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, var(--white) 2px, transparent 2px);
  background-size: 20px 20px;
}
</style> 