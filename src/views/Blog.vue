<template>
  <div class="blog-page">
    <div class="blog-header">
      <div class="logo">
        <a href="/blog">
          <img src="https://ext.same-assets.com/3781802305/805810644.png" alt="Devfolio Blog" >
        </a>
      </div>
      <h1>Never Stop Building</h1>
      <div class="blog-nav">
        <a href="/blog" class="nav-item">Home</a>
        <a href="https://twitter.com/devfolio" class="nav-item">Twitter</a>
        <a href="https://devfolio.co" class="nav-item">Website</a>
      </div>
      <div class="social-links">
        <a href="https://www.facebook.com/devfolio" class="social-link" title="Facebook">
          <i class="social-icon facebook"/>
        </a>
        <a href="https://twitter.com/devfolio" class="social-link" title="Twitter">
          <i class="social-icon twitter"/>
        </a>
        <button class="subscribe-btn">Subscribe</button>
      </div>
    </div>

    <div class="featured-post">
      <a href="/blog/base-batches-001/" class="post-link">
        <div class="post-image">
          <img src="https://ext.same-assets.com/3781802305/1304070258.png" alt="Base Batches: Build Onchain, Get Funded & Go Global" >
        </div>
        <div class="post-content">
          <h2>Base Batches: Build Onchain, Get Funded & Go Global</h2>
          <p>Forget what you know about hackathons and post-hackathon ghost towns. Base Batches is your deep onchain journey with real funding, real support, and real opportunities waiting on the other side.</p>
          <div class="post-meta">
            <span class="post-date">Apr 3, 2025</span>
            <span class="post-read-time">4 min read</span>
          </div>
        </div>
      </a>
    </div>

    <div class="posts-grid">
      <div class="post-card" v-for="(post, index) in posts" :key="index">
        <a :href="post.link" class="post-link">
          <div class="post-image">
            <img :src="post.image" :alt="post.title" >
          </div>
          <div class="post-content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <div class="post-meta">
              <span class="post-date">{{ post.date }}</span>
              <span class="post-read-time">{{ post.readTime }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class="blog-footer">
      <div class="footer-content">
        <p>We love software and the people who build it.</p>
        <div class="footer-links">
          <a href="#" class="footer-link">Community</a>
          <a href="#" class="footer-link">Company</a>
          <a href="#" class="footer-link">Support</a>
        </div>
      </div>
      <div class="footer-copyright">
        © 2025, NSB Classic PTE LTD
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      posts: [
        {
          title: 'The Mile High Effect: How ETHDenver 2025 Reached Rarefied Air in Ethereum Development',
          excerpt: 'In the crisp Colorado air, ETHDenver, now a legendary fixture in the Ethereum ecosystem, completed its 7th edition in Feb-Mar 2025. Heres a rundown of what happened behind-the-scenes and our reflections on yet another successful edition.',
          image: 'https://ext.same-assets.com/3781802305/1235216647.jpeg',
          date: 'Mar 28, 2025',
          readTime: '6 min read',
          link: '/blog/ethdenver-2025-recap/'
        },
        {
          title: 'ETHSF 2025: San Francisco Gets a Fresh Coat of Ethereum',
          excerpt: 'From Stanford lectures to Berkeley brainstorms to hacker houses: Ethereum finally got its moment in the Bay.',
          image: 'https://ext.same-assets.com/3781802305/2488795470.png',
          date: 'Mar 28, 2025',
          readTime: '6 min read',
          link: '/blog/ethsf-2025/'
        },
        {
          title: 'Reflecting on the Gen AI Exchange Hackathon by Google',
          excerpt: 'Join us as we look back at Google India\'s pioneer Gen AI hackathon that brought together 38,000+ builders from across the country to build innovative solutions to address some of India\'s crucial problems.',
          image: 'https://ext.same-assets.com/3781802305/430042394.png',
          date: 'Feb 6, 2025',
          readTime: '4 min read',
          link: '/blog/google-genaiexchange-recap/'
        },
        {
          title: '2024 Wrapped: A Year of Building Like There\'s No Tomorrow',
          excerpt: 'Where we spill the coffee beans on a year of building, breaking records, and occasionally balding people for the greater good.',
          image: 'https://ext.same-assets.com/3781802305/1629262514.png',
          date: 'Jan 31, 2025',
          readTime: '7 min read',
          link: '/blog/2024-wrapped/'
        },
        {
          title: 'ETHIndia 2024: Playing the Infinite Game of Ethereum',
          excerpt: 'Hit rewind on a hackathon where builders, developers, and dreamers came together to play an infinite game and contribute to the ever-growing Ethereum ecosystem.',
          image: 'https://ext.same-assets.com/3781802305/1688227717.png',
          date: 'Jan 27, 2025',
          readTime: '7 min read',
          link: '/blog/ethindia-2024-playing-the-infinite-game-of-ethereum/'
        },
        {
          title: 'When the Dino hopped Onchain',
          excerpt: 'ETHIndia 2024 was a resounding success, celebrating the thriving Ethereum ecosystem and pushing the boundaries of innovation.',
          image: 'https://ext.same-assets.com/3781802305/1912693301.png',
          date: 'Jan 25, 2025',
          readTime: '9 min read',
          link: '/blog/when-the-dino-hopped-onchain/'
        }
      ]
    };
  }
};
</script>

<style scoped>
.blog-page {
  font-family: 'Nunito Sans', sans-serif;
  background-color: #1f212c;
  color: #fff;
}

.blog-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo img {
  height: 40px;
  margin-bottom: 20px;
}

.blog-header h1 {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 30px;
}

.blog-nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.social-link {
  color: #fff;
  text-decoration: none;
}

.social-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
}

.facebook {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>');
}

.twitter {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>');
}

.subscribe-btn {
  background-color: #fff;
  color: #1f212c;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.featured-post {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.featured-post .post-link {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  color: #fff;
  text-decoration: none;
}

.featured-post .post-image img {
  width: 100%;
  border-radius: 10px;
}

.featured-post h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.featured-post p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
  opacity: 0.8;
}

.post-meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
  opacity: 0.6;
}

.posts-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.post-card {
  margin-bottom: 40px;
}

.post-card .post-link {
  color: #fff;
  text-decoration: none;
}

.post-card .post-image img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.post-card h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.post-card p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 15px;
  opacity: 0.8;
}

.blog-footer {
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 40px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-content {
  margin-bottom: 20px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.footer-copyright {
  font-size: 12px;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .featured-post .post-link {
    grid-template-columns: 1fr;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
