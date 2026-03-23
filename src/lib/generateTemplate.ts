interface TemplateData {
  businessName: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  primaryColor: string;
  accentColor: string;
  themeStyle: string;
  menuItems: { label: string; url: string }[];
  stats: { number: string; label: string }[];
  testimonialQuote: string;
  testimonialName: string;
  logoDataUrl?: string;
  heroDataUrl?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function generateHTML(data: TemplateData): string {
  const menuHTML = data.menuItems
    .filter((m) => m.label)
    .map((m) => `<a href="${m.url || '#'}" class="nav-link">${m.label}</a>`)
    .join("");

  const defaultMenu = !menuHTML
    ? `<a href="#" class="nav-link">HOME</a><a href="#about" class="nav-link">ABOUT US</a><a href="#features" class="nav-link">FAQ</a><a href="#contact" class="nav-link">CONTACT</a>`
    : menuHTML;

  const statsHTML = data.stats
    .filter((s) => s.number || s.label)
    .map((s) => `
      <div class="stat-card">
        <div class="stat-number">${s.number}</div>
        <div class="stat-label">${s.label}</div>
        <div class="stat-glow"></div>
      </div>`)
    .join("");

  const testimonialHTML = data.testimonialQuote
    ? `<section class="testimonial-section">
        <div class="testimonial-card">
          <div class="quote-icon">❝</div>
          <p class="quote-text">${data.testimonialQuote}</p>
          ${data.testimonialName ? `<div class="quote-author">
            <div class="author-avatar">${data.testimonialName.charAt(0)}</div>
            <span>— ${data.testimonialName}</span>
          </div>` : ""}
        </div>
      </section>`
    : "";

  const logoImg = data.logoDataUrl
    ? `<div class="logo-wrap"><img src="${data.logoDataUrl}" alt="Logo" class="logo-img" /><span class="logo-text">${data.businessName}</span></div>`
    : `<div class="logo-wrap"><div class="logo-dot"></div><span class="logo-text">${data.businessName}</span></div>`;

  const heroImg = data.heroDataUrl
    ? `<div class="hero-image-wrap">
        <div class="hero-image-glow"></div>
        <div class="floating-obj obj-1"></div>
        <div class="floating-obj obj-2"></div>
        <div class="floating-obj obj-3"></div>
        <div class="floating-obj obj-4"></div>
        <div class="floating-obj obj-5"></div>
        <div class="geometric-frame"></div>
        <img src="${data.heroDataUrl}" alt="Hero" class="hero-img" />
       </div>`
    : `<div class="hero-image-wrap">
        <div class="hero-image-glow"></div>
        <div class="floating-obj obj-1"></div>
        <div class="floating-obj obj-2"></div>
        <div class="floating-obj obj-3"></div>
        <div class="floating-obj obj-4"></div>
        <div class="floating-obj obj-5"></div>
        <div class="geometric-frame"></div>
        <div class="hero-placeholder">
          <span>${data.businessName.charAt(0)}</span>
        </div>
       </div>`;

  const pc = data.primaryColor;
  const ac = data.accentColor;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${data.businessName} — ${data.headline}</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Outfit',sans-serif;background:#070d1a;color:#e2e8f0;overflow-x:hidden;min-height:100vh}

    /* ===== ANIMATED BG ===== */
    body::before{content:'';position:fixed;inset:0;background:
      radial-gradient(ellipse 80% 50% at 20% 40%, ${hexToRgba(pc, 0.08)} 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 30%, ${hexToRgba(ac, 0.06)} 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 50% 80%, ${hexToRgba(pc, 0.04)} 0%, transparent 60%);
      pointer-events:none;z-index:0}
    
    /* Grid pattern */
    body::after{content:'';position:fixed;inset:0;background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size:60px 60px;pointer-events:none;z-index:0}

    /* Particle dots */
    .particles{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
    .particle{position:absolute;width:3px;height:3px;background:${ac};border-radius:50%;opacity:0;animation:particleFloat 8s infinite}
    .particle:nth-child(1){left:10%;top:20%;animation-delay:0s}
    .particle:nth-child(2){left:30%;top:60%;animation-delay:1.5s}
    .particle:nth-child(3){left:50%;top:30%;animation-delay:3s}
    .particle:nth-child(4){left:70%;top:70%;animation-delay:4.5s}
    .particle:nth-child(5){left:85%;top:15%;animation-delay:2s}
    .particle:nth-child(6){left:15%;top:80%;animation-delay:5.5s}
    .particle:nth-child(7){left:60%;top:50%;animation-delay:1s}
    .particle:nth-child(8){left:90%;top:45%;animation-delay:3.5s}
    @keyframes particleFloat{0%{opacity:0;transform:translateY(0) scale(0)}20%{opacity:0.8}50%{opacity:0.4}100%{opacity:0;transform:translateY(-200px) scale(1.5)}}

    /* ===== NAV ===== */
    nav{display:flex;align-items:center;justify-content:space-between;padding:20px 60px;background:rgba(7,13,26,0.7);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.05);position:sticky;top:0;z-index:100}
    .logo-wrap{display:flex;align-items:center;gap:10px}
    .logo-dot{width:32px;height:32px;background:linear-gradient(135deg,${pc},${ac});border-radius:8px;box-shadow:0 0 20px ${hexToRgba(pc, 0.4)}}
    .logo-img{height:36px;object-fit:contain}
    .logo-text{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;font-weight:700;color:#fff}
    .nav-links{display:flex;align-items:center;gap:8px}
    .nav-link{color:rgba(255,255,255,0.7);text-decoration:none;padding:8px 18px;font-size:0.85rem;font-weight:500;letter-spacing:1px;text-transform:uppercase;transition:all .3s;border-radius:8px}
    .nav-link:hover{color:#fff;background:rgba(255,255,255,0.05)}

    /* ===== HERO ===== */
    .hero{min-height:100vh;display:flex;align-items:center;padding:80px 60px;position:relative;z-index:1}
    .hero-content{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;width:100%;max-width:1400px;margin:0 auto}
    .hero-left{position:relative;z-index:2}
    .hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:${hexToRgba(pc, 0.1)};border:1px solid ${hexToRgba(pc, 0.3)};border-radius:50px;font-size:0.75rem;font-weight:600;color:${pc};margin-bottom:28px;letter-spacing:1px;text-transform:uppercase}
    .hero-badge::before{content:'';width:6px;height:6px;background:${pc};border-radius:50%;box-shadow:0 0 10px ${pc};animation:pulse 2s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
    
    h1{font-family:'Space Grotesk',sans-serif;font-size:4rem;font-weight:900;line-height:1.05;margin-bottom:24px}
    h1 .gradient{background:linear-gradient(135deg,${pc},${ac});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    h1 .white{color:#fff;-webkit-text-fill-color:#fff}
    
    .hero-desc{font-size:1.05rem;line-height:1.8;color:rgba(255,255,255,0.6);max-width:480px;margin-bottom:10px}
    .hero-subdesc{font-size:0.85rem;line-height:1.7;color:rgba(255,255,255,0.4);max-width:440px;margin-bottom:36px}

    .btn-group{display:flex;gap:16px;flex-wrap:wrap}
    .cta-btn{display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:linear-gradient(135deg,${pc},${ac});color:#070d1a;font-weight:700;font-size:0.95rem;border:none;border-radius:14px;cursor:pointer;text-decoration:none;transition:all .3s;box-shadow:0 0 40px ${hexToRgba(pc, 0.3)},0 8px 32px rgba(0,0,0,0.3);letter-spacing:0.5px}
    .cta-btn:hover{transform:translateY(-3px);box-shadow:0 0 60px ${hexToRgba(pc, 0.5)},0 12px 40px rgba(0,0,0,0.4)}
    .cta-btn svg{width:18px;height:18px}
    .secondary-btn{display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:transparent;color:#fff;font-weight:600;font-size:0.95rem;border:1px solid rgba(255,255,255,0.15);border-radius:14px;cursor:pointer;text-decoration:none;transition:all .3s;backdrop-filter:blur(10px)}
    .secondary-btn:hover{border-color:${pc};background:${hexToRgba(pc, 0.05)};transform:translateY(-2px)}

    /* ===== HERO IMAGE ===== */
    .hero-right{position:relative;display:flex;justify-content:center;align-items:center}
    .hero-image-wrap{position:relative;width:100%;max-width:560px;aspect-ratio:4/5;margin:0 auto}
    .hero-image-glow{position:absolute;inset:-40px;background:radial-gradient(circle,${hexToRgba(pc, 0.2)} 0%,${hexToRgba(ac, 0.1)} 40%,transparent 70%);border-radius:50%;filter:blur(60px);animation:glowPulse 4s ease-in-out infinite}
    @keyframes glowPulse{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
    
    .hero-img{width:100%;height:100%;object-fit:cover;border-radius:24px;position:relative;z-index:3;box-shadow:0 30px 80px rgba(0,0,0,0.5)}
    .hero-placeholder{width:100%;height:100%;background:linear-gradient(135deg,${hexToRgba(pc, 0.2)},${hexToRgba(ac, 0.2)});border-radius:24px;display:flex;align-items:center;justify-content:center;position:relative;z-index:3;border:1px solid rgba(255,255,255,0.1)}
    .hero-placeholder span{font-size:6rem;font-weight:900;color:${pc};opacity:0.3}

    /* Geometric frame behind hero */
    .geometric-frame{position:absolute;top:50%;left:50%;width:85%;height:85%;transform:translate(-50%,-50%) rotate(5deg);border:2px solid ${hexToRgba(ac, 0.15)};border-radius:30px;z-index:2;animation:frameRotate 20s linear infinite}
    @keyframes frameRotate{0%{transform:translate(-50%,-50%) rotate(5deg)}100%{transform:translate(-50%,-50%) rotate(365deg)}}

    /* Floating 3D objects */
    .floating-obj{position:absolute;z-index:4;border-radius:50%;animation:float 6s ease-in-out infinite}
    .obj-1{width:60px;height:60px;top:-20px;right:10%;background:linear-gradient(135deg,${pc},transparent);border:2px solid ${hexToRgba(pc, 0.4)};animation-delay:0s;box-shadow:0 0 30px ${hexToRgba(pc, 0.3)}}
    .obj-2{width:40px;height:40px;bottom:15%;left:-15px;background:${hexToRgba(ac, 0.2)};border:2px solid ${hexToRgba(ac, 0.5)};animation-delay:1s;border-radius:12px;transform:rotate(45deg);box-shadow:0 0 25px ${hexToRgba(ac, 0.3)}}
    .obj-3{width:20px;height:20px;top:30%;right:-10px;background:${ac};animation-delay:2s;box-shadow:0 0 20px ${ac}}
    .obj-4{width:50px;height:50px;bottom:-10px;right:25%;border:2px solid ${hexToRgba(pc, 0.3)};background:transparent;animation-delay:1.5s;border-radius:14px}
    .obj-5{width:14px;height:14px;top:20%;left:5%;background:${hexToRgba(ac, 0.6)};animation-delay:3s;box-shadow:0 0 15px ${hexToRgba(ac, 0.4)}}
    @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(10deg)}}

    /* ===== STATS ===== */
    .stats-section{position:relative;z-index:1;padding:80px 60px;border-top:1px solid rgba(255,255,255,0.04)}
    .stats-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:30px;max-width:1200px;margin:0 auto}
    .stat-card{position:relative;text-align:center;padding:40px 50px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:20px;backdrop-filter:blur(10px);overflow:hidden;transition:all .3s}
    .stat-card:hover{border-color:${hexToRgba(pc, 0.3)};transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.3)}
    .stat-number{font-family:'Space Grotesk',sans-serif;font-size:3rem;font-weight:800;background:linear-gradient(135deg,${pc},${ac});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .stat-label{font-size:0.85rem;color:rgba(255,255,255,0.5);margin-top:8px;font-weight:500;letter-spacing:1px;text-transform:uppercase}
    .stat-glow{position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);width:100px;height:40px;background:${hexToRgba(pc, 0.15)};filter:blur(30px);border-radius:50%}

    /* ===== FEATURES ===== */
    .features-section{position:relative;z-index:1;padding:100px 60px}
    .section-header{text-align:center;margin-bottom:60px}
    .section-tag{display:inline-block;padding:6px 18px;background:${hexToRgba(ac, 0.1)};border:1px solid ${hexToRgba(ac, 0.2)};border-radius:50px;font-size:0.75rem;font-weight:600;color:${ac};letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px}
    .section-title{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:800;color:#fff}
    .section-title .accent{color:${pc}}
    .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1200px;margin:0 auto}
    .feature-card{padding:36px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:20px;transition:all .4s;position:relative;overflow:hidden}
    .feature-card:hover{border-color:${hexToRgba(pc, 0.3)};transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,0.3)}
    .feature-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${pc},${ac},transparent);opacity:0;transition:opacity .4s}
    .feature-card:hover::after{opacity:1}
    .feature-icon{width:52px;height:52px;background:linear-gradient(135deg,${hexToRgba(pc, 0.15)},${hexToRgba(ac, 0.1)});border:1px solid ${hexToRgba(pc, 0.2)};border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:20px}
    .feature-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;font-weight:700;color:#fff;margin-bottom:10px}
    .feature-card p{font-size:0.875rem;color:rgba(255,255,255,0.5);line-height:1.7}

    /* ===== ABOUT ===== */
    .about-section{position:relative;z-index:1;padding:100px 60px}
    .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1200px;margin:0 auto}
    .about-visual{position:relative;height:400px;background:linear-gradient(135deg,${hexToRgba(pc, 0.08)},${hexToRgba(ac, 0.05)});border-radius:24px;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .about-visual::before{content:'';position:absolute;width:200px;height:200px;background:${hexToRgba(pc, 0.15)};border-radius:50%;filter:blur(60px)}
    .about-visual-text{font-family:'Space Grotesk',sans-serif;font-size:3rem;font-weight:900;color:${hexToRgba(pc, 0.2)};position:relative;z-index:1}
    .about-content h2{font-family:'Space Grotesk',sans-serif;font-size:2.2rem;font-weight:800;margin-bottom:20px}
    .about-content h2 .accent{color:${pc}}
    .about-content p{color:rgba(255,255,255,0.6);line-height:1.8;margin-bottom:16px;font-size:0.95rem}
    .about-list{list-style:none;margin-top:24px}
    .about-list li{display:flex;align-items:center;gap:12px;padding:10px 0;color:rgba(255,255,255,0.7);font-size:0.9rem}
    .about-list li::before{content:'✦';color:${ac};font-size:0.8rem}

    /* ===== TESTIMONIAL ===== */
    .testimonial-section{position:relative;z-index:1;padding:100px 60px;display:flex;justify-content:center}
    .testimonial-card{max-width:700px;text-align:center;padding:50px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:24px;position:relative;backdrop-filter:blur(10px)}
    .quote-icon{font-size:4rem;color:${hexToRgba(pc, 0.3)};line-height:1;margin-bottom:16px}
    .quote-text{font-size:1.2rem;font-style:italic;color:rgba(255,255,255,0.8);line-height:1.9}
    .quote-author{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:24px;font-weight:600;color:${ac}}
    .author-avatar{width:40px;height:40px;background:linear-gradient(135deg,${pc},${ac});border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;color:#070d1a;font-size:1rem}

    /* ===== CTA SECTION ===== */
    .cta-section{position:relative;z-index:1;padding:100px 60px;text-align:center}
    .cta-section .cta-box{max-width:800px;margin:0 auto;padding:60px;background:linear-gradient(135deg,${hexToRgba(pc, 0.08)},${hexToRgba(ac, 0.05)});border:1px solid ${hexToRgba(pc, 0.15)};border-radius:28px;position:relative;overflow:hidden}
    .cta-box::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,${hexToRgba(pc, 0.05)} 0%,transparent 50%);animation:rotateBg 15s linear infinite}
    @keyframes rotateBg{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    .cta-section h2{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:16px;position:relative;z-index:1}
    .cta-section p{color:rgba(255,255,255,0.6);margin-bottom:32px;position:relative;z-index:1;font-size:1rem}

    /* ===== FOOTER ===== */
    footer{position:relative;z-index:1;padding:50px 60px 30px;border-top:1px solid rgba(255,255,255,0.04)}
    .footer-inner{display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto}
    .footer-brand{display:flex;align-items:center;gap:10px}
    .footer-links{display:flex;gap:24px}
    .footer-links a{color:rgba(255,255,255,0.4);text-decoration:none;font-size:0.85rem;transition:color .3s}
    .footer-links a:hover{color:${pc}}
    .footer-copy{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.04);color:rgba(255,255,255,0.3);font-size:0.8rem}

    /* ===== RESPONSIVE ===== */
    @media(max-width:1024px){
      .hero-content{grid-template-columns:1fr;text-align:center}
      .hero-left{display:flex;flex-direction:column;align-items:center}
      .hero-desc,.hero-subdesc{text-align:center}
      .btn-group{justify-content:center}
      .hero-image-wrap{max-width:400px}
      .features-grid{grid-template-columns:repeat(2,1fr)}
      .about-grid{grid-template-columns:1fr}
    }
    @media(max-width:768px){
      nav{padding:16px 24px;flex-direction:column;gap:16px}
      .hero{padding:60px 24px}
      h1{font-size:2.5rem!important}
      .features-grid{grid-template-columns:1fr}
      .stats-section,.features-section,.about-section,.cta-section{padding:60px 24px}
      footer{padding:40px 24px 20px}
      .footer-inner{flex-direction:column;gap:20px}
    }
    @media(max-width:480px){
      h1{font-size:2rem!important}
      .btn-group{flex-direction:column;width:100%}
      .cta-btn,.secondary-btn{width:100%;justify-content:center}
    }
  </style>
</head>
<body>
  <!-- Particles -->
  <div class="particles">
    <div class="particle"></div><div class="particle"></div><div class="particle"></div><div class="particle"></div>
    <div class="particle"></div><div class="particle"></div><div class="particle"></div><div class="particle"></div>
  </div>

  <!-- NAV -->
  <nav>
    ${logoImg}
    <div class="nav-links">${defaultMenu}</div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-content">
      <div class="hero-left">
        <div class="hero-badge">✨ ${data.themeStyle || 'Premium Template'}</div>
        <h1>
          <span class="gradient">${data.headline.split(' ').slice(0, Math.ceil(data.headline.split(' ').length / 2)).join(' ')}</span><br/>
          <span class="white">${data.headline.split(' ').slice(Math.ceil(data.headline.split(' ').length / 2)).join(' ')}</span>
        </h1>
        <p class="hero-desc">${data.subheadline}</p>
        <p class="hero-subdesc">Premium designs crafted for modern brands. Fully customizable, lightning-fast, and built to convert visitors into customers.</p>
        <div class="btn-group">
          <a href="#" class="cta-btn">${data.ctaText || 'GET STARTED'}</a>
          <a href="#about" class="secondary-btn">Know More →</a>
        </div>
      </div>
      <div class="hero-right">
        ${heroImg}
      </div>
    </div>
  </section>

  <!-- STATS -->
  ${statsHTML ? `
  <section class="stats-section">
    <div class="stats-grid">${statsHTML}</div>
  </section>` : `
  <section class="stats-section">
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-number">50K+</div><div class="stat-label">Users Worldwide</div><div class="stat-glow"></div></div>
      <div class="stat-card"><div class="stat-number">4.98</div><div class="stat-label">Average Rating</div><div class="stat-glow"></div></div>
      <div class="stat-card"><div class="stat-number">99%</div><div class="stat-label">Satisfaction</div><div class="stat-glow"></div></div>
      <div class="stat-card"><div class="stat-number">24/7</div><div class="stat-label">Support</div><div class="stat-glow"></div></div>
    </div>
  </section>`}

  <!-- FEATURES -->
  <section class="features-section" id="features">
    <div class="section-header">
      <div class="section-tag">What We Offer</div>
      <h2 class="section-title">Why Choose <span class="accent">${data.businessName}</span></h2>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Optimized for speed with instant loading times and smooth performance across all devices.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3>Fully Customizable</h3>
        <p>Every element is tailored to your brand — colors, fonts, images, and layouts.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>Mobile Responsive</h3>
        <p>Looks stunning on every screen size, from desktop monitors to mobile phones.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Secure & Reliable</h3>
        <p>Built with enterprise-grade security and 99.9% uptime guarantee.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🚀</div>
        <h3>SEO Optimized</h3>
        <p>Rank higher on search engines with built-in SEO best practices and meta tags.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💎</div>
        <h3>Premium Quality</h3>
        <p>Professional designs that make your brand stand out from the competition.</p>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about-section" id="about">
    <div class="about-grid">
      <div class="about-visual">
        <span class="about-visual-text">${data.businessName}</span>
      </div>
      <div class="about-content">
        <h2>About <span class="accent">${data.businessName}</span></h2>
        <p>${data.subheadline}</p>
        <p>We believe in creating exceptional digital experiences that drive real results. Our designs combine cutting-edge aesthetics with proven conversion strategies.</p>
        <ul class="about-list">
          <li>Premium hand-crafted design</li>
          <li>Conversion-optimized layouts</li>
          <li>24/7 dedicated support</li>
          <li>Regular updates & improvements</li>
        </ul>
      </div>
    </div>
  </section>

  ${testimonialHTML}

  <!-- CTA -->
  <section class="cta-section" id="contact">
    <div class="cta-box">
      <h2>Ready to Get Started?</h2>
      <p>Join thousands of satisfied customers who trust ${data.businessName} for their digital presence.</p>
      <a href="#" class="cta-btn">${data.ctaText || 'GET STARTED'} →</a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-inner">
      ${logoImg}
      <div class="footer-links">
        <a href="#">Home</a>
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
    <div class="footer-copy">© ${new Date().getFullYear()} ${data.businessName} — Built with LandingForge ❤️</div>
  </footer>
</body>
</html>`;
}

export function downloadHTML(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function previewHTML(html: string) {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

export async function downloadAsImage(html: string, filename: string, format: "jpeg" | "png") {
  const { default: html2canvas } = await import("html2canvas");

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "1440px";
  iframe.style.height = "900px";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    document.body.removeChild(iframe);
    return;
  }

  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();

  await new Promise((r) => setTimeout(r, 2000));

  const fullHeight = iframeDoc.documentElement.scrollHeight;
  iframe.style.height = fullHeight + "px";

  await new Promise((r) => setTimeout(r, 500));

  const canvas = await html2canvas(iframeDoc.body, {
    width: 1440,
    height: fullHeight,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#070d1a",
    scale: 2,
  });

  document.body.removeChild(iframe);

  const mimeType = format === "png" ? "image/png" : "image/jpeg";
  const dataUrl = canvas.toDataURL(mimeType, 0.95);
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
