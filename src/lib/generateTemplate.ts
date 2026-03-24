import template1 from "@/assets/template-1.png";
import template2 from "@/assets/template-2.jpg";
import template3 from "@/assets/template-3.jpg";
import template4 from "@/assets/template-4.jpg";
import template5 from "@/assets/template-5.jpg";
import template6 from "@/assets/template-6.jpg";
import template7 from "@/assets/template-7.jpg";
import template8 from "@/assets/template-8.jpg";
import template9 from "@/assets/template-9.jpg";

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

const templateImageMap: Record<string, string> = {
  "Alphabet Creative": template1,
  "Futuristic Exhibition": template2,
  "Geometric Shapes": template3,
  "Fashion Forward": template4,
  "Polygonal Burst": template5,
  "Education Portal": template6,
  "Ocean Dive": template7,
  "Corporate Landing": template8,
  "Space Creative": template9,
};

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function absoluteAssetUrl(path?: string) {
  if (!path) return "";
  if (/^https?:/i.test(path) || path.startsWith("data:")) return path;
  return new URL(path, window.location.origin).href;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function waitForImages(doc: Document) {
  const images = Array.from(doc.images);

  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }

          const cleanup = () => {
            img.removeEventListener("load", handleDone);
            img.removeEventListener("error", handleDone);
          };

          const handleDone = () => {
            cleanup();
            resolve();
          };

          img.addEventListener("load", handleDone, { once: true });
          img.addEventListener("error", handleDone, { once: true });
        }),
    ),
  );
}

async function prepareIframeDocument(doc: Document) {
  await waitForImages(doc);

  if ("fonts" in doc) {
    try {
      await (doc as Document & { fonts?: FontFaceSet }).fonts?.ready;
    } catch {
      // ignore font readiness failures
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
}

export function generateHTML(data: TemplateData): string {
  const primaryColor = data.primaryColor || "#00BFFF";
  const accentColor = data.accentColor || "#FFD700";
  const templateImageUrl = absoluteAssetUrl(templateImageMap[data.themeStyle] || template8);
  const heroImageUrl = absoluteAssetUrl(data.heroDataUrl);
  const logoImageUrl = absoluteAssetUrl(data.logoDataUrl);

  const words = (data.headline || "Your Amazing Headline").trim().split(/\s+/);
  const splitIndex = Math.max(1, Math.ceil(words.length / 2));
  const firstLine = escapeHtml(words.slice(0, splitIndex).join(" "));
  const secondLine = escapeHtml(words.slice(splitIndex).join(" "));

  const menuHTML = data.menuItems
    .filter((item) => item.label)
    .map(
      (item) =>
        `<a href="${escapeHtml(item.url || "#")}" class="nav-link">${escapeHtml(item.label)}</a>`,
    )
    .join("");

  const finalMenu =
    menuHTML ||
    '<a href="#hero" class="nav-link">HOME</a><a href="#about" class="nav-link">ABOUT US</a><a href="#features" class="nav-link">FEATURES</a><a href="#contact" class="nav-link">CONTACT</a>';

  const statsHTML = data.stats
    .filter((item) => item.number || item.label)
    .map(
      (item) => `
        <div class="stat-card">
          <div class="stat-number">${escapeHtml(item.number || "0")}</div>
          <div class="stat-label">${escapeHtml(item.label || "Metric")}</div>
        </div>`,
    )
    .join("");

  const finalStats =
    statsHTML ||
    `
      <div class="stat-card"><div class="stat-number">50K+</div><div class="stat-label">Creators</div></div>
      <div class="stat-card"><div class="stat-number">4.98</div><div class="stat-label">Rating</div></div>
      <div class="stat-card"><div class="stat-number">60s</div><div class="stat-label">Setup Time</div></div>
      <div class="stat-card"><div class="stat-number">24/7</div><div class="stat-label">Support</div></div>
    `;

  const testimonialHTML = data.testimonialQuote
    ? `
      <section class="testimonial-section">
        <div class="testimonial-card">
          <div class="quote-mark">❝</div>
          <p class="testimonial-copy">${escapeHtml(data.testimonialQuote)}</p>
          ${
            data.testimonialName
              ? `<div class="testimonial-author">— ${escapeHtml(data.testimonialName)}</div>`
              : ""
          }
        </div>
      </section>`
    : "";

  const brandName = escapeHtml(data.businessName || "My Business");
  const subheadline = escapeHtml(data.subheadline || "Your compelling subheadline goes here.");
  const ctaText = escapeHtml(data.ctaText || "GET STARTED");
  const themeStyle = escapeHtml(data.themeStyle || "Premium Theme");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${brandName} — ${escapeHtml(data.headline || "Your Amazing Headline")}</title>
  <base href="${window.location.origin}/" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Outfit', sans-serif;
      color: #eef4ff;
      background:
        linear-gradient(135deg, rgba(4, 10, 24, 0.92), rgba(7, 12, 28, 0.9)),
        url('${templateImageUrl}') center top / cover no-repeat fixed;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(circle at 20% 20%, ${hexToRgba(primaryColor, 0.20)}, transparent 30%),
        radial-gradient(circle at 80% 18%, ${hexToRgba(accentColor, 0.18)}, transparent 24%),
        radial-gradient(circle at 50% 80%, ${hexToRgba(primaryColor, 0.14)}, transparent 26%);
      pointer-events: none;
      z-index: 0;
    }
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(${hexToRgba(primaryColor, 0.08)} 1px, transparent 1px),
        linear-gradient(90deg, ${hexToRgba(primaryColor, 0.08)} 1px, transparent 1px);
      background-size: 58px 58px;
      mask-image: linear-gradient(to bottom, rgba(0,0,0,0.75), transparent 92%);
      pointer-events: none;
      z-index: 0;
    }
    .shell {
      position: relative;
      z-index: 1;
      backdrop-filter: blur(2px);
    }
    .topbar {
      position: sticky;
      top: 0;
      z-index: 20;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      padding: 22px 48px;
      background: rgba(7, 12, 28, 0.62);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      backdrop-filter: blur(18px);
    }
    .logo-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .logo-badge {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      overflow: hidden;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, ${primaryColor}, ${accentColor});
      box-shadow: 0 0 30px ${hexToRgba(primaryColor, 0.40)};
      flex-shrink: 0;
    }
    .logo-badge img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .logo-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
    .menu {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      gap: 6px;
    }
    .nav-link {
      color: rgba(228, 238, 255, 0.76);
      text-decoration: none;
      padding: 10px 16px;
      font-size: 0.82rem;
      letter-spacing: 1.2px;
      font-weight: 600;
      border-radius: 999px;
      transition: 0.25s ease;
    }
    .nav-link:hover {
      color: white;
      background: ${hexToRgba(primaryColor, 0.14)};
      box-shadow: inset 0 0 0 1px ${hexToRgba(primaryColor, 0.18)};
    }
    .hero {
      min-height: calc(100vh - 85px);
      padding: 48px 48px 36px;
      display: grid;
      align-items: center;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(460px, 620px);
      gap: 56px;
      align-items: center;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      border-radius: 999px;
      background: ${hexToRgba(primaryColor, 0.12)};
      box-shadow: inset 0 0 0 1px ${hexToRgba(primaryColor, 0.22)};
      color: ${accentColor};
      font-size: 0.78rem;
      letter-spacing: 1.4px;
      font-weight: 700;
      margin-bottom: 24px;
      text-transform: uppercase;
    }
    .eyebrow::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: ${primaryColor};
      box-shadow: 0 0 18px ${hexToRgba(primaryColor, 0.9)};
    }
    .hero-copy h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(3rem, 6vw, 5.6rem);
      line-height: 0.98;
      margin-bottom: 22px;
      text-wrap: balance;
    }
    .hero-copy h1 .gradient {
      background: linear-gradient(135deg, white 10%, ${accentColor} 48%, ${primaryColor} 96%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-copy h1 .plain {
      color: white;
      display: block;
      text-shadow: 0 0 30px rgba(255,255,255,0.12);
    }
    .hero-copy p {
      max-width: 600px;
      font-size: 1.06rem;
      line-height: 1.9;
      color: rgba(226, 236, 255, 0.72);
      margin-bottom: 34px;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 28px;
    }
    .btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-width: 170px;
      padding: 15px 24px;
      border-radius: 16px;
      text-decoration: none;
      font-weight: 700;
      transition: 0.25s ease;
    }
    .btn-primary {
      color: #08101f;
      background: linear-gradient(135deg, ${accentColor}, ${primaryColor});
      box-shadow: 0 16px 40px ${hexToRgba(primaryColor, 0.22)};
    }
    .btn-primary:hover { transform: translateY(-2px); }
    .btn-secondary {
      color: white;
      background: rgba(255,255,255,0.04);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.09);
      backdrop-filter: blur(12px);
    }
    .hero-visual {
      position: relative;
      min-height: 720px;
      display: grid;
      place-items: center;
    }
    .visual-glow,
    .visual-glow-2 {
      position: absolute;
      border-radius: 999px;
      filter: blur(55px);
      pointer-events: none;
    }
    .visual-glow {
      width: 290px;
      height: 290px;
      left: 6%;
      top: 18%;
      background: ${hexToRgba(primaryColor, 0.35)};
    }
    .visual-glow-2 {
      width: 240px;
      height: 240px;
      right: 12%;
      bottom: 16%;
      background: ${hexToRgba(accentColor, 0.24)};
    }
    .showcase {
      position: relative;
      width: 100%;
      max-width: 560px;
      min-height: 680px;
      border-radius: 34px;
      padding: 22px;
      background: rgba(5, 10, 22, 0.48);
      box-shadow:
        0 40px 100px rgba(0,0,0,0.48),
        inset 0 0 0 1px rgba(255,255,255,0.06);
      backdrop-filter: blur(18px);
      overflow: hidden;
      isolation: isolate;
    }
    .showcase::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(160deg, ${hexToRgba(primaryColor, 0.16)}, transparent 45%, ${hexToRgba(accentColor, 0.10)} 100%);
      z-index: -1;
    }
    .template-preview {
      width: 100%;
      height: 100%;
      min-height: 636px;
      object-fit: contain;
      object-position: center top;
      border-radius: 26px;
      background: rgba(2, 6, 16, 0.85);
      box-shadow: 0 22px 80px rgba(0,0,0,0.45);
    }
    .floating-card,
    .floating-ring,
    .floating-cube,
    .floating-pill {
      position: absolute;
      backdrop-filter: blur(10px);
    }
    .floating-card {
      left: -8px;
      bottom: 70px;
      width: 210px;
      padding: 16px;
      border-radius: 22px;
      background: rgba(8, 16, 34, 0.72);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 50px rgba(0,0,0,0.30);
    }
    .floating-card strong {
      display: block;
      margin-bottom: 6px;
      font-size: 0.92rem;
      color: white;
    }
    .floating-card span {
      display: block;
      color: rgba(226,236,255,0.70);
      font-size: 0.82rem;
      line-height: 1.55;
    }
    .floating-ring {
      top: 56px;
      right: 18px;
      width: 94px;
      height: 94px;
      border-radius: 999px;
      border: 10px solid ${hexToRgba(accentColor, 0.78)};
      box-shadow: 0 0 0 12px ${hexToRgba(primaryColor, 0.09)}, 0 0 42px ${hexToRgba(accentColor, 0.22)};
      transform: rotate(28deg);
    }
    .floating-cube {
      width: 96px;
      height: 96px;
      right: -8px;
      top: 220px;
      border-radius: 22px;
      background: linear-gradient(135deg, ${hexToRgba(primaryColor, 0.32)}, ${hexToRgba(accentColor, 0.18)});
      box-shadow: inset 0 0 0 2px ${hexToRgba(accentColor, 0.22)};
      transform: rotate(24deg);
    }
    .floating-pill {
      width: 168px;
      right: 8px;
      bottom: 18px;
      padding: 12px 16px;
      border-radius: 999px;
      background: rgba(8, 16, 34, 0.76);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
      color: ${accentColor};
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: center;
    }
    .uploaded-hero {
      position: absolute;
      right: 54px;
      bottom: 110px;
      width: 180px;
      height: 180px;
      border-radius: 28px;
      object-fit: cover;
      box-shadow: 0 24px 60px rgba(0,0,0,0.42), inset 0 0 0 3px ${hexToRgba(accentColor, 0.36)};
      border: 4px solid ${hexToRgba(primaryColor, 0.38)};
      background: rgba(8, 16, 34, 0.82);
    }
    .stats-wrap,
    .content-section,
    .cta-section,
    .testimonial-section,
    .footer {
      position: relative;
      z-index: 1;
      max-width: 1400px;
      margin: 0 auto;
      padding-left: 48px;
      padding-right: 48px;
    }
    .stats-wrap {
      margin-top: -12px;
      padding-bottom: 44px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
    }
    .stat-card {
      padding: 26px 22px;
      border-radius: 24px;
      background: rgba(8, 14, 30, 0.62);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
      backdrop-filter: blur(14px);
    }
    .stat-number {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.4rem;
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, ${accentColor}, ${primaryColor});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .stat-label {
      margin-top: 10px;
      color: rgba(226,236,255,0.62);
      font-size: 0.9rem;
      letter-spacing: 0.5px;
    }
    .content-section {
      padding-top: 36px;
      padding-bottom: 34px;
    }
    .section-header {
      max-width: 680px;
      margin-bottom: 28px;
    }
    .section-label {
      display: inline-block;
      margin-bottom: 16px;
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 1.2px;
      color: ${accentColor};
      background: ${hexToRgba(accentColor, 0.10)};
      box-shadow: inset 0 0 0 1px ${hexToRgba(accentColor, 0.18)};
    }
    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 3.4vw, 3rem);
      line-height: 1.08;
      margin-bottom: 14px;
    }
    .section-title em {
      color: ${primaryColor};
      font-style: normal;
    }
    .section-desc {
      color: rgba(226,236,255,0.68);
      line-height: 1.9;
      font-size: 1rem;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }
    .feature-card {
      padding: 24px;
      border-radius: 24px;
      background: rgba(8, 14, 30, 0.58);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
      backdrop-filter: blur(12px);
    }
    .feature-icon {
      width: 54px;
      height: 54px;
      display: grid;
      place-items: center;
      margin-bottom: 18px;
      border-radius: 16px;
      background: linear-gradient(135deg, ${hexToRgba(primaryColor, 0.22)}, ${hexToRgba(accentColor, 0.16)});
      box-shadow: inset 0 0 0 1px ${hexToRgba(primaryColor, 0.16)};
      font-size: 1.35rem;
    }
    .feature-card h3 {
      font-size: 1.04rem;
      margin-bottom: 10px;
      color: white;
    }
    .feature-card p {
      color: rgba(226,236,255,0.64);
      line-height: 1.75;
      font-size: 0.92rem;
    }
    .about-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 24px;
      align-items: stretch;
    }
    .about-panel,
    .about-art {
      border-radius: 30px;
      background: rgba(8, 14, 30, 0.58);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
      backdrop-filter: blur(12px);
      overflow: hidden;
    }
    .about-panel {
      padding: 34px;
    }
    .about-panel p {
      color: rgba(226,236,255,0.68);
      line-height: 1.9;
      margin-bottom: 14px;
    }
    .about-list {
      list-style: none;
      display: grid;
      gap: 12px;
      margin-top: 18px;
    }
    .about-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      color: rgba(235,242,255,0.76);
    }
    .about-list li::before {
      content: '✦';
      color: ${accentColor};
      font-size: 0.9rem;
    }
    .about-art {
      position: relative;
      min-height: 360px;
      background:
        linear-gradient(145deg, ${hexToRgba(primaryColor, 0.12)}, transparent 45%),
        linear-gradient(320deg, ${hexToRgba(accentColor, 0.14)}, rgba(8, 14, 30, 0.30));
    }
    .about-art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.92;
    }
    .about-art .art-fallback {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      color: ${hexToRgba(primaryColor, 0.74)};
      letter-spacing: 1px;
    }
    .testimonial-section {
      padding-top: 34px;
      padding-bottom: 18px;
    }
    .testimonial-card {
      padding: 38px 32px;
      border-radius: 30px;
      background: rgba(8, 14, 30, 0.62);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
      backdrop-filter: blur(14px);
      text-align: center;
    }
    .quote-mark {
      font-size: 4rem;
      line-height: 1;
      color: ${hexToRgba(primaryColor, 0.34)};
      margin-bottom: 10px;
    }
    .testimonial-copy {
      font-size: 1.16rem;
      line-height: 1.95;
      color: rgba(240,245,255,0.82);
      max-width: 900px;
      margin: 0 auto;
    }
    .testimonial-author {
      margin-top: 20px;
      font-weight: 700;
      color: ${accentColor};
    }
    .cta-section {
      padding-top: 32px;
      padding-bottom: 38px;
    }
    .cta-box {
      padding: 38px 28px;
      border-radius: 32px;
      text-align: center;
      background:
        linear-gradient(135deg, ${hexToRgba(primaryColor, 0.16)}, ${hexToRgba(accentColor, 0.10)}),
        rgba(8, 14, 30, 0.64);
      box-shadow: inset 0 0 0 1px ${hexToRgba(primaryColor, 0.14)};
      backdrop-filter: blur(14px);
    }
    .cta-box h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 3.2vw, 3rem);
      margin-bottom: 10px;
    }
    .cta-box p {
      color: rgba(226,236,255,0.70);
      margin-bottom: 22px;
      line-height: 1.85;
    }
    .footer {
      padding-top: 26px;
      padding-bottom: 32px;
    }
    .footer-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 22px 24px;
      border-radius: 26px;
      background: rgba(8, 14, 30, 0.58);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
      backdrop-filter: blur(14px);
    }
    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }
    .footer-links a {
      color: rgba(226,236,255,0.60);
      text-decoration: none;
      font-size: 0.9rem;
    }
    .footer-links a:hover { color: white; }
    .copyright {
      text-align: center;
      margin-top: 14px;
      color: rgba(226,236,255,0.42);
      font-size: 0.86rem;
    }
    @media (max-width: 1160px) {
      .hero-grid,
      .about-grid,
      .feature-grid,
      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }
      .hero-grid {
        grid-template-columns: 1fr;
      }
      .hero-copy {
        text-align: center;
      }
      .hero-copy p,
      .section-header {
        margin-left: auto;
        margin-right: auto;
      }
      .actions { justify-content: center; }
      .hero-visual { min-height: unset; }
    }
    @media (max-width: 768px) {
      .topbar,
      .hero,
      .stats-wrap,
      .content-section,
      .cta-section,
      .testimonial-section,
      .footer {
        padding-left: 20px;
        padding-right: 20px;
      }
      .topbar {
        padding-top: 18px;
        padding-bottom: 18px;
        flex-direction: column;
      }
      .menu { gap: 2px; }
      .hero { padding-top: 28px; }
      .showcase {
        min-height: 500px;
        padding: 14px;
      }
      .template-preview { min-height: 470px; }
      .uploaded-hero {
        width: 120px;
        height: 120px;
        right: 26px;
        bottom: 78px;
      }
      .floating-card {
        width: 160px;
        left: 10px;
        bottom: 58px;
      }
      .floating-ring {
        width: 68px;
        height: 68px;
      }
      .floating-cube {
        width: 70px;
        height: 70px;
        top: 170px;
      }
      .hero-grid,
      .about-grid,
      .feature-grid,
      .stats-grid,
      .footer-card {
        grid-template-columns: 1fr;
      }
      .footer-card {
        display: grid;
        justify-items: center;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="shell">
    <nav class="topbar">
      <div class="logo-wrap">
        <div class="logo-badge">${logoImageUrl ? `<img src="${logoImageUrl}" alt="${brandName} logo" />` : brandName.charAt(0)}</div>
        <span class="logo-text">${brandName}</span>
      </div>
      <div class="menu">${finalMenu}</div>
    </nav>

    <section class="hero" id="hero">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">${themeStyle}</div>
          <h1>
            <span class="gradient">${firstLine}</span>
            ${secondLine ? `<span class="plain">${secondLine}</span>` : ""}
          </h1>
          <p>${subheadline}</p>
          <div class="actions">
            <a href="#contact" class="btn btn-primary">${ctaText}</a>
            <a href="#features" class="btn btn-secondary">See Full Experience</a>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-glow"></div>
          <div class="visual-glow-2"></div>
          <div class="showcase">
            <img src="${templateImageUrl}" alt="${themeStyle} template preview" class="template-preview" />
            <div class="floating-ring"></div>
            <div class="floating-cube"></div>
            <div class="floating-card">
              <strong>${brandName}</strong>
              <span>${subheadline}</span>
            </div>
            <div class="floating-pill">Premium • Interactive • Responsive</div>
            ${heroImageUrl ? `<img src="${heroImageUrl}" alt="${brandName} hero" class="uploaded-hero" />` : ""}
          </div>
        </div>
      </div>
    </section>

    <section class="stats-wrap">
      <div class="stats-grid">${finalStats}</div>
    </section>

    <section class="content-section" id="features">
      <div class="section-header">
        <span class="section-label">Premium Features</span>
        <h2 class="section-title">See the full <em>${brandName}</em> experience with background, artwork, and branded changes</h2>
        <p class="section-desc">Your selected template stays visible, the premium background remains intact, and your headline, CTA, logo, colors, and uploaded image all appear together in one polished preview.</p>
      </div>
      <div class="feature-grid">
        <article class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>Original Template Artwork</h3>
          <p>The chosen template screenshot stays inside the live preview so the premium visuals and objects remain fully visible.</p>
        </article>
        <article class="feature-card">
          <div class="feature-icon">🌌</div>
          <h3>Full Background Styling</h3>
          <p>Neon glows, deep dark overlays, grid texture, and layered gradients keep the page looking rich instead of flat.</p>
        </article>
        <article class="feature-card">
          <div class="feature-icon">🖼️</div>
          <h3>Image-Driven Composition</h3>
          <p>Your uploaded hero image sits on top of the premium template composition for a stronger branded presentation.</p>
        </article>
      </div>
    </section>

    <section class="content-section" id="about">
      <div class="about-grid">
        <div class="about-panel">
          <span class="section-label">About ${brandName}</span>
          <h2 class="section-title">A premium landing page look built around your <em>custom details</em></h2>
          <p>${subheadline}</p>
          <p>This preview is designed to show your brand changes without hiding the original premium layout style, visuals, or object-rich composition.</p>
          <ul class="about-list">
            <li>Selected template artwork stays visible</li>
            <li>Background and glow effects remain on preview</li>
            <li>Customized headline, CTA, and brand identity update instantly</li>
            <li>JPEG and PNG downloads capture the full styled page</li>
          </ul>
        </div>
        <div class="about-art">
          ${heroImageUrl ? `<img src="${heroImageUrl}" alt="${brandName} visual" />` : `<div class="art-fallback">${brandName}</div>`}
        </div>
      </div>
    </section>

    ${testimonialHTML}

    <section class="cta-section" id="contact">
      <div class="cta-box">
        <h2>Ready to launch ${brandName}?</h2>
        <p>Use this premium preview to review every visual layer before downloading your branded template image.</p>
        <a href="#hero" class="btn btn-primary">${ctaText}</a>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-card">
        <div class="logo-wrap">
          <div class="logo-badge">${logoImageUrl ? `<img src="${logoImageUrl}" alt="${brandName} logo" />` : brandName.charAt(0)}</div>
          <span class="logo-text">${brandName}</span>
        </div>
        <div class="footer-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div class="copyright">© ${new Date().getFullYear()} ${brandName} — Built with LandingForge ❤️</div>
    </footer>
  </div>
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
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function downloadAsImage(html: string, filename: string, format: "jpeg" | "png") {
  const { default: html2canvas } = await import("html2canvas");

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "1440px";
  iframe.style.height = "1600px";
  iframe.style.border = "none";
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    document.body.removeChild(iframe);
    return;
  }

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
    backgroundColor: "#070d1a",
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
