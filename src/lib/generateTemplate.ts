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
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    whatsapp?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function waitForImages(doc: Document) {
  const images = Array.from(doc.images);
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) { resolve(); return; }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
}

async function prepareIframeDocument(doc: Document) {
  await waitForImages(doc);
  if ("fonts" in doc) {
    try { await (doc as any).fonts?.ready; } catch { /* ignore */ }
  }
  await new Promise((resolve) => setTimeout(resolve, 600));
}

/* ─── Shared HTML parts ─── */

function buildNav(data: TemplateData): string {
  const brandName = escapeHtml(data.businessName || "My Business");
  const logoHtml = data.logoDataUrl
    ? `<img src="${data.logoDataUrl}" alt="logo" style="width:100%;height:100%;object-fit:cover;"/>`
    : `<span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.2rem;color:#fff;">${brandName.charAt(0)}</span>`;
  const menuHtml = data.menuItems
    .filter((m) => m.label)
    .map((m) => `<a href="${escapeHtml(m.url || "#")}" class="nav-link">${escapeHtml(m.label)}</a>`)
    .join("");
  return `
  <nav class="top-nav">
    <div class="brand">
      <div class="brand-logo">${logoHtml}</div>
      <span class="brand-name">${brandName}</span>
    </div>
    ${menuHtml ? `<div class="nav-links">${menuHtml}</div>` : ""}
  </nav>`;
}

function buildHero(data: TemplateData): string {
  const headline = escapeHtml(data.headline || "Your Amazing Headline");
  const sub = escapeHtml(data.subheadline || "Your compelling subheadline goes here.");
  const cta = escapeHtml(data.ctaText || "GET STARTED");
  const heroImg = data.heroDataUrl
    ? `<div class="hero-image-wrap"><img src="${data.heroDataUrl}" alt="hero" class="hero-image"/></div>`
    : "";
  return `
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">${headline}</h1>
      <p class="hero-sub">${sub}</p>
      <a href="#" class="cta-btn">${cta}</a>
    </div>
    ${heroImg}
  </section>`;
}

function buildStats(data: TemplateData): string {
  const items = data.stats.filter((s) => s.number || s.label);
  if (!items.length) return "";
  const html = items
    .map((s) => `<div class="stat"><span class="stat-num">${escapeHtml(s.number || "0")}</span><span class="stat-lbl">${escapeHtml(s.label || "")}</span></div>`)
    .join("");
  return `<section class="stats-section"><div class="stats-row">${html}</div></section>`;
}

function buildTestimonial(data: TemplateData): string {
  if (!data.testimonialQuote) return "";
  return `
  <section class="testimonial-section">
    <div class="testimonial">
      <div class="tq">"${escapeHtml(data.testimonialQuote)}"</div>
      ${data.testimonialName ? `<div class="ta">— ${escapeHtml(data.testimonialName)}</div>` : ""}
    </div>
  </section>`;
}

function buildSocial(data: TemplateData): string {
  const icons: Record<string, { icon: string; label: string }> = {
    instagram: { icon: "📸", label: "Instagram" },
    facebook: { icon: "📘", label: "Facebook" },
    twitter: { icon: "🐦", label: "Twitter" },
    whatsapp: { icon: "💬", label: "WhatsApp" },
    tiktok: { icon: "🎵", label: "TikTok" },
    youtube: { icon: "▶️", label: "YouTube" },
    linkedin: { icon: "💼", label: "LinkedIn" },
  };
  if (!data.socialLinks) return "";
  const links = Object.entries(data.socialLinks)
    .filter(([, url]) => url && url.trim())
    .map(([key, url]) => {
      const info = icons[key] || { icon: "🔗", label: key };
      return `<a href="${escapeHtml(url!)}" target="_blank" rel="noopener noreferrer" class="soc-link"><span>${info.icon}</span> ${info.label}</a>`;
    })
    .join("");
  if (!links) return "";
  return `<section class="social-section"><div class="social-bar">${links}</div></section>`;
}

function buildFooter(data: TemplateData): string {
  const name = escapeHtml(data.businessName || "My Business");
  return `<footer class="footer-bar">© ${new Date().getFullYear()} ${name}. All rights reserved.</footer>`;
}

/* ─── Template-specific background CSS ─── */

function getTemplateCSS(style: string, primary: string, accent: string): string {
  const templates: Record<string, string> = {
    "Alphabet Creative": `
      body{background:linear-gradient(135deg,#0d0d0d 0%,#1a1a2e 50%,#16213e 100%);}
      .hero-section{background:radial-gradient(ellipse at 30% 50%,${primary}15 0%,transparent 60%);}
      body::before{content:'';position:fixed;top:-50%;left:-50%;width:200%;height:200%;
        background:repeating-linear-gradient(45deg,transparent,transparent 80px,${primary}06 80px,${primary}06 82px);
        animation:drift 30s linear infinite;pointer-events:none;z-index:0;}
      @keyframes drift{to{transform:translate(80px,80px);}}
      .hero-title{background:linear-gradient(135deg,#fff,${accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    `,
    "Futuristic Exhibition": `
      body{background:linear-gradient(180deg,#030714 0%,#0c1445 40%,#1e0533 100%);}
      .hero-section{background:radial-gradient(circle at 70% 30%,${primary}20 0%,transparent 50%);}
      body::before{content:'';position:fixed;inset:0;
        background:linear-gradient(90deg,${primary}08 1px,transparent 1px),linear-gradient(0deg,${primary}08 1px,transparent 1px);
        background-size:60px 60px;pointer-events:none;z-index:0;}
      body::after{content:'';position:fixed;top:20%;right:10%;width:300px;height:300px;
        border-radius:50%;background:radial-gradient(circle,${accent}15,transparent 70%);
        filter:blur(60px);pointer-events:none;z-index:0;}
      .hero-title{text-shadow:0 0 40px ${primary}66,0 0 80px ${primary}33;}
    `,
    "Geometric Shapes": `
      body{background:linear-gradient(160deg,#0a0a0a 0%,#1a0a2e 50%,#0a1a2e 100%);}
      body::before{content:'';position:fixed;inset:0;
        background:
          linear-gradient(60deg,${primary}10 25%,transparent 25%),
          linear-gradient(-60deg,${accent}08 25%,transparent 25%),
          linear-gradient(120deg,${primary}06 25%,transparent 25%);
        pointer-events:none;z-index:0;}
      body::after{content:'';position:fixed;top:10%;left:5%;width:400px;height:400px;
        border:2px solid ${accent}20;transform:rotate(45deg);pointer-events:none;z-index:0;}
      .hero-section::before{content:'';position:absolute;bottom:0;right:10%;width:200px;height:200px;
        border:3px solid ${primary}25;border-radius:50%;pointer-events:none;}
      .hero-title{background:linear-gradient(90deg,${accent},#fff,${primary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    `,
    "Fashion Forward": `
      body{background:linear-gradient(135deg,#0a0a0a 0%,#1a0f0f 50%,#2a1520 100%);}
      .hero-section{background:radial-gradient(ellipse at 80% 50%,${accent}12 0%,transparent 50%);}
      body::before{content:'';position:fixed;inset:0;
        background:repeating-linear-gradient(0deg,transparent,transparent 100px,${accent}04 100px,${accent}04 101px);
        pointer-events:none;z-index:0;}
      .hero-title{font-style:italic;letter-spacing:0.05em;
        text-shadow:2px 2px 0 ${accent}44,-2px -2px 0 ${primary}44;}
      .cta-btn{border-radius:0!important;text-transform:uppercase;letter-spacing:4px;}
    `,
    "Polygonal Burst": `
      body{background:linear-gradient(135deg,#050510 0%,#0a1628 40%,#0f0a28 100%);}
      body::before{content:'';position:fixed;inset:0;
        background:
          radial-gradient(circle at 20% 80%,${primary}18 0%,transparent 40%),
          radial-gradient(circle at 80% 20%,${accent}15 0%,transparent 40%),
          radial-gradient(circle at 50% 50%,${primary}08 0%,transparent 60%);
        pointer-events:none;z-index:0;}
      body::after{content:'';position:fixed;top:5%;right:15%;
        width:0;height:0;border-left:150px solid transparent;border-right:150px solid transparent;
        border-bottom:260px solid ${primary}08;pointer-events:none;z-index:0;}
      .hero-title{text-shadow:0 0 60px ${accent}44;}
    `,
    "Education Portal": `
      body{background:linear-gradient(180deg,#0a1929 0%,#0d2137 50%,#071420 100%);}
      .hero-section{background:radial-gradient(ellipse at 50% 0%,${primary}18 0%,transparent 50%);}
      body::before{content:'';position:fixed;inset:0;
        background:
          radial-gradient(circle at 15% 15%,${primary}12 0%,transparent 20%),
          radial-gradient(circle at 85% 85%,${accent}10 0%,transparent 20%),
          radial-gradient(circle at 50% 50%,${primary}05 0%,transparent 40%);
        pointer-events:none;z-index:0;}
      .hero-title{color:${accent};}
      .stat{border-left:3px solid ${primary};}
    `,
    "Ocean Dive": `
      body{background:linear-gradient(180deg,#020c1b 0%,#0a192f 30%,#0d3b66 70%,#041c32 100%);}
      body::before{content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse at 30% 70%,${primary}20 0%,transparent 50%),
          radial-gradient(ellipse at 70% 30%,${accent}12 0%,transparent 50%);
        pointer-events:none;z-index:0;animation:ocean 8s ease-in-out infinite alternate;}
      @keyframes ocean{0%{opacity:0.7;}100%{opacity:1;}}
      body::after{content:'';position:fixed;bottom:0;left:0;right:0;height:40%;
        background:linear-gradient(0deg,${primary}15,transparent);pointer-events:none;z-index:0;}
      .hero-title{text-shadow:0 4px 30px ${primary}66;}
    `,
    "Corporate Landing": `
      body{background:linear-gradient(160deg,#0c0c0c 0%,#1a1a2e 50%,#0f0f23 100%);}
      .hero-section{background:radial-gradient(ellipse at 0% 50%,${primary}10 0%,transparent 50%);}
      body::before{content:'';position:fixed;inset:0;
        background:linear-gradient(90deg,${primary}04 1px,transparent 1px),linear-gradient(0deg,${primary}04 1px,transparent 1px);
        background-size:80px 80px;pointer-events:none;z-index:0;}
      .hero-title{font-weight:800;letter-spacing:-0.02em;}
      .cta-btn{border-radius:8px!important;}
    `,
    "Space Creative": `
      body{background:linear-gradient(180deg,#000010 0%,#0a0a2e 40%,#1a0a3e 70%,#0a0020 100%);}
      body::before{content:'';position:fixed;inset:0;
        background:
          radial-gradient(1px 1px at 20% 30%,#fff 0%,transparent 100%),
          radial-gradient(1px 1px at 40% 70%,#fff 0%,transparent 100%),
          radial-gradient(1px 1px at 60% 20%,#fff 0%,transparent 100%),
          radial-gradient(1px 1px at 80% 60%,#fff 0%,transparent 100%),
          radial-gradient(2px 2px at 10% 80%,${accent}88 0%,transparent 100%),
          radial-gradient(2px 2px at 90% 40%,${primary}88 0%,transparent 100%),
          radial-gradient(1px 1px at 50% 50%,#fff 0%,transparent 100%),
          radial-gradient(1px 1px at 30% 90%,#fff 0%,transparent 100%),
          radial-gradient(1px 1px at 70% 10%,#fff 0%,transparent 100%),
          radial-gradient(1px 1px at 15% 55%,#fff 0%,transparent 100%);
        pointer-events:none;z-index:0;}
      body::after{content:'';position:fixed;top:10%;left:30%;width:500px;height:500px;
        border-radius:50%;background:radial-gradient(circle,${primary}12,${accent}06,transparent 70%);
        filter:blur(80px);pointer-events:none;z-index:0;}
      .hero-title{text-shadow:0 0 50px ${primary}88,0 0 100px ${accent}44;}
    `,
  };
  return templates[style] || templates["Corporate Landing"]!;
}

/* ─── Main generator ─── */

export async function generateHTML(data: TemplateData): Promise<string> {
  const brandName = escapeHtml(data.businessName || "My Business");
  const primary = data.primaryColor || "#00BFFF";
  const accent = data.accentColor || "#FFD700";

  const templateCSS = getTemplateCSS(data.themeStyle, primary, accent);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${brandName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:'Outfit',sans-serif;color:#fff;min-height:100vh;overflow-x:hidden;position:relative;}

    /* === TEMPLATE-SPECIFIC BACKGROUND === */
    ${templateCSS}

    /* === GLOBAL === */
    section,nav,footer{position:relative;z-index:1;}

    /* === NAV === */
    .top-nav{
      display:flex;justify-content:space-between;align-items:center;
      padding:20px 40px;
      background:rgba(0,0,0,0.3);backdrop-filter:blur(20px);
      border-bottom:1px solid rgba(255,255,255,0.06);
    }
    .brand{display:flex;align-items:center;gap:12px;}
    .brand-logo{
      width:44px;height:44px;border-radius:12px;overflow:hidden;
      background:linear-gradient(135deg,${primary},${accent});
      display:grid;place-items:center;flex-shrink:0;
      box-shadow:0 0 20px ${primary}33;
    }
    .brand-logo img{width:100%;height:100%;object-fit:cover;}
    .brand-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.15rem;color:#fff;}
    .nav-links{display:flex;gap:4px;flex-wrap:wrap;}
    .nav-link{
      color:rgba(255,255,255,0.75);text-decoration:none;
      padding:8px 16px;font-size:0.82rem;font-weight:600;letter-spacing:0.5px;
      border-radius:999px;transition:all 0.25s;
    }
    .nav-link:hover{background:rgba(255,255,255,0.1);color:#fff;}

    /* === HERO === */
    .hero-section{
      display:flex;align-items:center;justify-content:center;
      min-height:85vh;padding:80px 40px;gap:60px;
      position:relative;
    }
    .hero-content{max-width:650px;flex:1;}
    .hero-title{
      font-family:'Space Grotesk',sans-serif;
      font-size:clamp(2.4rem,5.5vw,4.5rem);
      font-weight:800;line-height:1.08;
      margin-bottom:20px;color:#fff;
    }
    .hero-sub{
      font-size:1.1rem;line-height:1.8;
      color:rgba(255,255,255,0.7);
      margin-bottom:32px;max-width:540px;
    }
    .cta-btn{
      display:inline-block;padding:16px 36px;
      border-radius:14px;font-weight:700;font-size:0.95rem;
      color:#000;text-decoration:none;
      background:linear-gradient(135deg,${accent},${primary});
      box-shadow:0 8px 30px ${primary}44;
      transition:all 0.3s;
    }
    .cta-btn:hover{transform:translateY(-3px);box-shadow:0 14px 40px ${primary}66;}

    .hero-image-wrap{
      flex:0 0 auto;width:clamp(250px,30vw,420px);
      height:clamp(300px,35vw,500px);
      border-radius:24px;overflow:hidden;position:relative;
      box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 40px ${primary}22;
      border:2px solid rgba(255,255,255,0.08);
    }
    .hero-image{width:100%;height:100%;object-fit:cover;display:block;}

    /* === STATS === */
    .stats-section{padding:60px 40px;background:rgba(0,0,0,0.2);}
    .stats-row{
      display:flex;flex-wrap:wrap;gap:20px;justify-content:center;
      max-width:1100px;margin:0 auto;
    }
    .stat{
      padding:28px 36px;border-radius:20px;text-align:center;min-width:150px;
      background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);
      backdrop-filter:blur(10px);transition:transform 0.3s;
    }
    .stat:hover{transform:translateY(-4px);}
    .stat-num{
      display:block;font-family:'Space Grotesk',sans-serif;
      font-size:2rem;font-weight:800;
      background:linear-gradient(135deg,${accent},${primary});
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    }
    .stat-lbl{display:block;margin-top:8px;color:rgba(255,255,255,0.5);font-size:0.88rem;font-weight:500;}

    /* === TESTIMONIAL === */
    .testimonial-section{padding:60px 40px;}
    .testimonial{
      max-width:800px;margin:0 auto;text-align:center;
      padding:40px;border-radius:24px;
      background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);
      backdrop-filter:blur(10px);
    }
    .tq{font-size:1.15rem;line-height:1.9;color:rgba(255,255,255,0.75);font-style:italic;}
    .ta{margin-top:16px;font-weight:700;color:${accent};font-size:0.95rem;}

    /* === SOCIAL === */
    .social-section{padding:40px;text-align:center;}
    .social-bar{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}
    .soc-link{
      display:inline-flex;align-items:center;gap:8px;
      padding:12px 22px;border-radius:999px;
      background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);
      color:rgba(255,255,255,0.7);text-decoration:none;
      font-size:0.85rem;font-weight:600;transition:all 0.25s;
    }
    .soc-link:hover{background:${primary}22;color:#fff;border-color:${primary}44;transform:translateY(-2px);}

    /* === FOOTER === */
    .footer-bar{
      text-align:center;padding:28px 20px;
      color:rgba(255,255,255,0.3);font-size:0.82rem;
      border-top:1px solid rgba(255,255,255,0.06);
      background:rgba(0,0,0,0.2);
    }

    @media(max-width:768px){
      .top-nav{padding:14px 20px;flex-direction:column;gap:10px;}
      .hero-section{flex-direction:column;padding:50px 20px;min-height:auto;gap:30px;text-align:center;}
      .hero-sub{margin-left:auto;margin-right:auto;}
      .hero-image-wrap{width:90%;height:300px;}
      .stats-section,.testimonial-section,.social-section{padding:30px 20px;}
      .stat{min-width:120px;padding:20px 20px;}
    }
  </style>
</head>
<body>
  ${buildNav(data)}
  ${buildHero(data)}
  ${buildStats(data)}
  ${buildTestimonial(data)}
  ${buildSocial(data)}
  ${buildFooter(data)}
</body>
</html>`;
}

/* ─── Utilities ─── */

export function previewHTML(html: string) {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
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
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) { document.body.removeChild(iframe); return; }

  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();

  await prepareIframeDocument(iframeDoc);

  const fullHeight = Math.max(
    iframeDoc.body.scrollHeight,
    iframeDoc.documentElement.scrollHeight,
    iframeDoc.body.offsetHeight,
    iframeDoc.documentElement.offsetHeight,
  );

  iframe.style.height = `${fullHeight}px`;
  await prepareIframeDocument(iframeDoc);

  const canvas = await html2canvas(iframeDoc.documentElement, {
    width: 1440,
    height: fullHeight,
    windowWidth: 1440,
    windowHeight: fullHeight,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    scale: 2,
    scrollX: 0,
    scrollY: 0,
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
