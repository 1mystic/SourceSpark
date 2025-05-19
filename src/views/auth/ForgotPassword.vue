<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Reset Password</h1>
      <p class="auth-subtitle">Enter your email and we'll send you a link to reset your password</p>

      <div v-if="emailSent" class="success-message">
        <div class="success-icon">✓</div>
        <h2>Reset Link Sent</h2>
        <p>We've sent a password reset link to <strong>{{ email }}</strong>. Please check your email and follow the instructions to reset your password.</p>
        <p>Don't see the email? Check your spam folder or <a href="#" @click.prevent="handleResend" class="resend-link">click here to resend</a>.</p>
        <router-link to="/login" class="back-to-login">Back to Login</router-link>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            :class="{ 'error': emailError }"
            required
          >
          <div class="error-message" v-if="emailError">{{ emailError }}</div>
        </div>

        <button type="submit" class="auth-submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
        </button>

        <p class="auth-redirect">
          Remembered your password? <router-link to="/login">Log in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      emailError: '',
      isLoading: false,
      emailSent: false
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = 'Email is required';
        return false;
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Please enter a valid email address';
        return false;
      }
      this.emailError = '';
      return true;
    },
    handleSubmit() {
      if (this.validateEmail()) {
        this.isLoading = true;

        // Simulate API call
        setTimeout(() => {
          this.isLoading = false;
          this.emailSent = true;
        }, 1500);
      }
    },
    handleResend() {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Just refresh the success message
      }, 1500);
    }
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 40px 20px;
  background-color: var(--bg-color);
}

.auth-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.05);
  padding: 40px;
  width: 100%;
  max-width: 480px;
}

.dark-mode .auth-card {
  background-color: #23272a;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.dark-mode .auth-title {
  color: #f9f8f7;
}

.auth-subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.dark-mode .auth-subtitle {
  color: #aaa;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.dark-mode label {
  color: #f9f8f7;
}

input[type="email"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.dark-mode input[type="email"] {
  background-color: #2c2f33;
  border-color: #444;
  color: #f9f8f7;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

input.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

.auth-submit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;
}

.auth-submit-btn:hover {
  background-color: #2d4a8e;
}

.auth-submit-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.auth-redirect {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.dark-mode .auth-redirect {
  color: #aaa;
}

.auth-redirect a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.success-message {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #2ecc71;
  color: white;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.success-message h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.dark-mode .success-message h2 {
  color: #f9f8f7;
}

.success-message p {
  margin-bottom: 15px;
  color: #666;
  line-height: 1.5;
}

.dark-mode .success-message p {
  color: #aaa;
}

.resend-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.back-to-login {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 20px;
}

.back-to-login:hover {
  background-color: #2d4a8e;
}

@media (max-width: 576px) {
  .auth-card {
    padding: 25px;
  }

  .auth-title {
    font-size: 24px;
  }
}
</style>
