<template>
  <div class="about-page">
    <div class="about-hero">
      <div class="container">
        <h1>About Devfolio</h1>
        <p class="subtitle">We love software and the people who build them</p>
      </div>
    </div>

    <div class="about-content container">
      <div class="about-section">
        <h2>Our Mission</h2>
        <p>
          At Devfolio, we're on a mission to redefine economic opportunities for builders by creating the best platform for hackathons and developer portfolios. We believe in the power of community-driven innovation and are committed to helping developers showcase their skills, connect with peers, and find their next big opportunity.
        </p>
      </div>

      <div class="about-section">
        <h2>Our Story</h2>
        <p>
          Devfolio was born in 2019 when we powered our first community hackathon. Since then, we've grown exponentially, supporting over 1,300 hackathons, connecting more than 800,000 builders, and featuring over 75,000 innovative projects. What started as a hackathon management platform has evolved into a complete ecosystem for developers to build, learn, and grow.
        </p>
      </div>

      <div class="about-section">
        <h2>What We Do</h2>
        <p>
          We provide a suite of tools that make organizing and participating in hackathons seamless and rewarding. Our platform enables:
        </p>
        <ul>
          <li>Effortless hackathon organization and management</li>
          <li>Streamlined participant applications and judging</li>
          <li>Professional developer portfolios to showcase work</li>
          <li>A community of like-minded builders and innovators</li>
          <li>Connections between talent and opportunities</li>
        </ul>
      </div>

      <div class="about-section">
        <h2>Our Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <h3>Community First</h3>
            <p>We believe in the power of community and put the needs of our users at the center of everything we do.</p>
          </div>
          <div class="value-card">
            <h3>Innovation</h3>
            <p>We're constantly pushing boundaries and exploring new ways to support and showcase builder talent.</p>
          </div>
          <div class="value-card">
            <h3>Inclusivity</h3>
            <p>We're committed to creating a platform where everyone feels welcome and has the opportunity to participate.</p>
          </div>
          <div class="value-card">
            <h3>Excellence</h3>
            <p>We strive for excellence in all aspects of our platform, from user experience to customer support.</p>
          </div>
        </div>
      </div>

      <div class="about-section">
        <h2>Join Our Journey</h2>
        <p>
          Whether you're a hackathon organizer, a participant, or simply someone passionate about building cool things, we invite you to join us on this journey. Together, we can create a more vibrant and inclusive developer ecosystem.
        </p>
        <div class="cta-buttons">
          <a href="/hackathons" class="btn btn-primary">Explore Hackathons</a>
          <a href="/organize" class="btn btn-outline">Organize a Hackathon</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
.about-hero {
  background-color: var(--primary-color);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.about-hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.about-hero .subtitle {
  font-size: 20px;
  opacity: 0.9;
}

.about-content {
  padding: 60px 20px;
  max-width: 800px;
}

.about-section {
  margin-bottom: 60px;
}

.about-section h2 {
  color: var(--primary-color);
  font-size: 32px;
  margin-bottom: 20px;
}

.about-section p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.about-section ul {
  margin-left: 20px;
  margin-bottom: 20px;
}

.about-section li {
  font-size: 18px;
  margin-bottom: 10px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 30px;
}

.value-card {
  background-color: #f2f2f2;
  padding: 30px;
  border-radius: 8px;
}

.value-card h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.cta-buttons {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .about-hero h1 {
    font-size: 36px;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
