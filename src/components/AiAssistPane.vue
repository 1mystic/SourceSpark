<template>
  <div class="ai-assist-pane">
    <div v-if="isLoggedIn" class="ai-content">
      <h3>AI Assist</h3>
      <div class="ai-section">
        <p><strong>Project Summary:</strong></p>
        <p>Get a quick summary or guidance for your current project here.</p>
      </div>
      <div class="ai-section">
        <p><strong>Guidance & Suggestions:</strong></p>
        <ul>
          <li>Ask for help with tasks or code.</li>
          <li>Get suggestions for next steps.</li>
          <li>Summarize discussions or project details.</li>
        </ul>
      </div>
      <textarea placeholder="Ask AI for help..." class="ai-input"></textarea>
      <button class="btn btn-primary ai-btn">Send</button>
    </div>
    <div v-else class="ai-login-prompt">
      <h3>AI Assist</h3>
      <p>Please <router-link to="/auth/login">log in</router-link> to use AI Assist features.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AiAssistPane',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.ai-assist-pane {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: #fff;
  border-left: 1px solid #e3e3e3;
  box-shadow: -2px 0 8px rgba(0,0,0,0.04);
  z-index: 1000;
  padding: 24px 18px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.ai-content h3 { margin-bottom: 10px; }
.ai-section { margin-bottom: 16px; }
.ai-input { width: 100%; min-height: 60px; border-radius: 6px; border: 1px solid #ccc; padding: 8px; margin-bottom: 8px; }
.ai-btn { width: 100%; }
.ai-login-prompt { text-align: center; margin-top: 40px; }
@media (max-width: 900px) {
  .ai-assist-pane { display: none; }
}
</style>
