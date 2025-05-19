<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Log In</h1>
      <p class="auth-subtitle">Welcome back! Log in to your account to continue building.</p>

      <form @submit.prevent="handleLogin" class="auth-form">
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

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              :class="{ 'error': passwordError }"
              required
            >
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <div class="error-message" v-if="passwordError">{{ passwordError }}</div>
        </div>

        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="remember">
            <label for="remember">Remember me</label>
          </div>
          <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
        </div>

        <button type="submit" class="auth-submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>

        <div class="auth-divider">
          <span>OR</span>
        </div>

        <div class="social-login">
          <button type="button" class="social-btn github" @click="handleGithubLogin">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
          <button type="button" class="social-btn google" @click="handleGoogleLogin">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M12.2448 10.0938V14.1538H17.1458C16.9158 15.5698 15.5698 18.2738 12.2448 18.2738C9.38583 18.2738 7.05083 15.9158 7.05083 12.9988C7.05083 10.0818 9.38583 7.72383 12.2448 7.72383C13.8128 7.72383 14.8628 8.37583 15.4698 8.95783L18.5848 5.94283C16.9848 4.43983 14.7938 3.49683 12.2448 3.49683C7.07583 3.49683 2.86883 7.70383 2.86883 12.9988C2.86883 18.2938 7.07583 22.5008 12.2448 22.5008C17.7548 22.5008 21.5578 18.3388 21.5578 13.1578C21.5578 12.5508 21.4908 12.0528 21.4128 11.5438H12.2448V10.0938Z" fill="#4285F4"/>
              <path d="M3.96875 7.62891L7.53675 10.2659C8.40675 8.71891 10.1888 7.72391 12.2488 7.72391C13.8168 7.72391 14.8668 8.37591 15.4738 8.95791L18.5888 5.94291C16.9888 4.43991 14.7978 3.49691 12.2488 3.49691C8.71175 3.49691 5.68075 5.14491 3.96875 7.62891Z" fill="#EA4335"/>
              <path d="M12.2487 22.4991C14.7417 22.4991 16.8847 21.6081 18.4747 20.1871L15.0727 17.3851C14.1107 18.0731 13.2407 18.4991 12.2487 18.2731C8.94266 18.2731 6.19766 15.6031 5.47266 12.2181L1.90466 14.9091C3.60666 19.4711 7.61866 22.4991 12.2487 22.4991Z" fill="#34A853"/>
              <path d="M21.4117 11.5442H12.2437V14.1542H17.1447C16.5367 15.8122 15.3387 16.9772 13.7147 17.7242L13.7268 17.7371L17.1288 20.5391C16.9558 20.6981 21.5567 17.0801 21.5567 13.1582C21.5567 12.5512 21.4897 12.0532 21.4117 11.5442Z" fill="#4285F4"/>
              <path d="M5.47266 12.2169C5.23966 11.5439 5.11066 10.8169 5.11066 10.0679C5.11066 9.31886 5.23966 8.59186 5.45966 7.91886L5.44666 7.79386L1.83766 5.12086L1.75566 5.19486C0.987656 6.94786 0.551656 8.95486 0.551656 10.0679C0.551656 11.1809 0.987656 13.1879 1.75566 14.9409L5.47266 12.2169Z" fill="#FBBC05"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p class="auth-redirect">
          Don't have an account? <router-link to="/signup">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider, githubProvider, db } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      showPassword: false,
      isLoading: false,
      emailError: '',
      passwordError: '',
      error: ''
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
    validatePassword() {
      if (!this.password) {
        this.passwordError = 'Password is required';
        return false;
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    async handleLogin(e) {
      e.preventDefault();
      this.isLoading = true;
      this.error = '';
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/');
      } catch (err) {
        this.error = 'Login failed. ' + (err.message || '');
      } finally {
        this.isLoading = false;
      }
    },
    async handleGoogleLogin() {
      this.isLoading = true;
      this.error = '';
      try {
        await signInWithPopup(auth, googleProvider);
        this.$router.push('/');
      } catch (err) {
        this.error = 'Google login failed. ' + (err.message || '');
      } finally {
        this.isLoading = false;
      }
    },
    async handleGithubLogin() {
      this.isLoading = true;
      this.error = '';
      try {
        await signInWithPopup(auth, githubProvider);
        this.$router.push('/');
      } catch (err) {
        this.error = 'GitHub login failed. ' + (err.message || '');
      } finally {
        this.isLoading = false;
      }
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

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.dark-mode input[type="email"],
.dark-mode input[type="password"],
.dark-mode input[type="text"] {
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

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
}

.dark-mode .toggle-password {
  color: #aaa;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 8px;
}

.forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
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
}

.auth-submit-btn:hover {
  background-color: #2d4a8e;
}

.auth-submit-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.auth-divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #666;
}

.dark-mode .auth-divider {
  color: #aaa;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #e5e5e5;
}

.dark-mode .auth-divider::before,
.dark-mode .auth-divider::after {
  background-color: #444;
}

.auth-divider span {
  padding: 0 10px;
  font-size: 14px;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 10px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  color: #333;
}

.dark-mode .social-btn {
  background-color: #2c2f33;
  border-color: #444;
  color: #f9f8f7;
}

.social-btn:hover {
  background-color: #f5f5f5;
}

.dark-mode .social-btn:hover {
  background-color: #23272a;
}

.social-btn svg {
  fill: currentColor;
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

@media (max-width: 576px) {
  .auth-card {
    padding: 25px;
  }

  .auth-title {
    font-size: 24px;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .forgot-password {
    align-self: flex-end;
  }
}
</style>
