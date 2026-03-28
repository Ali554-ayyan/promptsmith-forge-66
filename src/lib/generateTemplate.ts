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
          if (img.complete) { resolve(); return; }
          const handleDone = () => resolve();
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
    } catch { /* ignore */ }
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
}

/**
 * Converts an image URL to a base64 data URL so it works reliably
 * inside blob previews and html2canvas iframes.
 */
async function toDataUrl(url: string): Promise<string> {
  if (!url) return "";
  if (url.startsWith("data:")) return url;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return url;
  }
}

/**
 * Generates an HTML page that uses the ORIGINAL template image as a
 * full-screen background. User details are overlaid on top.
 * Template images are embedded as data URLs for reliable rendering.
 */
export async function generateHTML(data: TemplateData): Promise<string> {
  const rawTemplateUrl = absoluteAssetUrl(templateImageMap[data.themeStyle] || template8);
  const templateImageUrl = await toDataUrl(rawTemplateUrl);
  const heroImageUrl = data.heroDataUrl || "";
  const logoImageUrl = data.logoDataUrl || "";

  const brandName = escapeHtml(data.businessName || "My Business");
  const headline = escapeHtml(data.headline || "Your Amazing Headline");
  const subheadline = escapeHtml(data.subheadline || "Your compelling subheadline goes here.");
  const ctaText = escapeHtml(data.ctaText || "GET STARTED");
  const primaryColor = data.primaryColor || "#00BFFF";
  const accentColor = data.accentColor || "#FFD700";

  /* Navigation */
  const menuHTML = data.menuItems
    .filter((item) => item.label)
    .map((item) => `<a href="${escapeHtml(item.url || "#")}" class="nav-link">${escapeHtml(item.label)}</a>`)
    .join("");

  /* Stats */
  const statsHTML = data.stats
    .filter((s) => s.number || s.label)
    .map((s) => `<div class="stat"><span class="stat-num">${escapeHtml(s.number || "0")}</span><span class="stat-lbl">${escapeHtml(s.label || "")}</span></div>`)
    .join("");

  /* Testimonial */
  const testimonialHTML = data.testimonialQuote
    ? `<div class="testimonial">
        <div class="tq">"${escapeHtml(data.testimonialQuote)}"</div>
        ${data.testimonialName ? `<div class="ta">— ${escapeHtml(data.testimonialName)}</div>` : ""}
      </div>`
    : "";

  /* Social */
  const socialIcons: Record<string, { icon: string; label: string }> = {
    instagram: { icon: "📸", label: "Instagram" },
    facebook: { icon: "📘", label: "Facebook" },
    twitter: { icon: "🐦", label: "Twitter" },
    whatsapp: { icon: "💬", label: "WhatsApp" },
    tiktok: { icon: "🎵", label: "TikTok" },
    youtube: { icon: "▶️", label: "YouTube" },
    linkedin: { icon: "💼", label: "LinkedIn" },
  };

  const socialHTML = data.socialLinks
    ? Object.entries(data.socialLinks)
        .filter(([, url]) => url && url.trim())
        .map(([key, url]) => {
          const info = socialIcons[key] || { icon: "🔗", label: key };
          return `<a href="${escapeHtml(url!)}" target="_blank" rel="noopener noreferrer" class="soc-link"><span>${info.icon}</span> ${info.label}</a>`;
        })
        .join("")
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${brandName}</title>
  <base href="${window.location.origin}/" />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body{width:100%;min-height:100vh;overflow-x:hidden;}

    /* ======== FULL-SCREEN ORIGINAL TEMPLATE BACKGROUND ======== */
    body{
      font-family:'Outfit',sans-serif;
      color:#fff;
      background:#000;
    }
    .template-bg{
      position:relative;
      width:100%;
    }
    .template-bg img.bg-img{
      display:block;
      width:100%;
      height:auto;
    }

    /* ======== TOP NAV OVERLAY ======== */
    .overlay-nav{
      position:absolute;
      top:0;left:0;right:0;
      z-index:10;
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:18px 32px;
      background:linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
    }
    .brand{
      display:flex;align-items:center;gap:10px;
    }
    .brand-logo{
      width:38px;height:38px;border-radius:10px;overflow:hidden;
      background:linear-gradient(135deg,${primaryColor},${accentColor});
      display:grid;place-items:center;
      box-shadow:0 0 20px ${primaryColor}44;
      flex-shrink:0;
    }
    .brand-logo img{width:100%;height:100%;object-fit:cover;}
    .brand-logo .letter{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.1rem;color:#fff;}
    .brand-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.05rem;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.5);}
    .nav-links{display:flex;gap:4px;flex-wrap:wrap;}
    .nav-link{
      color:rgba(255,255,255,0.85);text-decoration:none;
      padding:8px 14px;font-size:0.78rem;letter-spacing:1px;font-weight:600;
      border-radius:999px;transition:0.2s;
    }
    .nav-link:hover{background:rgba(255,255,255,0.12);color:#fff;}

    /* ======== HERO TEXT OVERLAY (centered on image) ======== */
    .overlay-hero{
      position:absolute;
      bottom:8%;left:0;right:0;
      z-index:10;
      text-align:center;
      padding:0 32px;
    }
    .overlay-hero h1{
      font-family:'Space Grotesk',sans-serif;
      font-size:clamp(2rem,5vw,4.2rem);
      font-weight:800;
      line-height:1.05;
      text-shadow:0 4px 30px rgba(0,0,0,0.7),0 0 60px rgba(0,0,0,0.4);
      margin-bottom:12px;
    }
    .overlay-hero h1 .acc{color:${accentColor};}
    .overlay-hero p{
      max-width:700px;margin:0 auto 20px;
      font-size:1.05rem;line-height:1.7;
      color:rgba(255,255,255,0.88);
      text-shadow:0 2px 12px rgba(0,0,0,0.6);
    }
    .cta-btn{
      display:inline-block;
      padding:14px 32px;border-radius:14px;
      font-weight:700;font-size:0.95rem;
      color:#000;text-decoration:none;
      background:linear-gradient(135deg,${accentColor},${primaryColor});
      box-shadow:0 8px 30px ${primaryColor}44;
      transition:0.2s;
    }
    .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px ${primaryColor}66;}

    /* ======== HERO IMAGE OVERLAY ======== */
    .hero-photo{
      position:absolute;
      bottom:12%;right:5%;
      width:clamp(120px,14vw,200px);
      height:clamp(120px,14vw,200px);
      border-radius:20px;object-fit:cover;
      border:3px solid ${accentColor}88;
      box-shadow:0 12px 40px rgba(0,0,0,0.5);
      z-index:10;
    }

    /* ======== SECTIONS BELOW TEMPLATE IMAGE ======== */
    .sections{
      background:linear-gradient(180deg,#0a0e1a 0%,#060a14 100%);
      padding:40px 32px 0;
    }
    .section-inner{max-width:1200px;margin:0 auto;}

    /* Stats */
    .stats-row{
      display:flex;flex-wrap:wrap;gap:16px;justify-content:center;
      margin-bottom:40px;
    }
    .stat{
      padding:20px 28px;border-radius:18px;
      background:rgba(255,255,255,0.04);
      border:1px solid rgba(255,255,255,0.06);
      text-align:center;min-width:130px;
      backdrop-filter:blur(8px);
    }
    .stat-num{
      display:block;font-family:'Space Grotesk',sans-serif;
      font-size:1.8rem;font-weight:800;
      background:linear-gradient(135deg,${accentColor},${primaryColor});
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    }
    .stat-lbl{display:block;margin-top:6px;color:rgba(255,255,255,0.55);font-size:0.85rem;}

    /* Testimonial */
    .testimonial{
      max-width:800px;margin:0 auto 40px;text-align:center;
      padding:32px;border-radius:24px;
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.06);
    }
    .tq{font-size:1.1rem;line-height:1.8;color:rgba(255,255,255,0.78);font-style:italic;}
    .ta{margin-top:14px;font-weight:700;color:${accentColor};}

    /* Social */
    .social-bar{
      display:flex;flex-wrap:wrap;gap:10px;justify-content:center;
      margin-bottom:30px;
    }
    .soc-link{
      display:inline-flex;align-items:center;gap:6px;
      padding:10px 18px;border-radius:999px;
      background:rgba(255,255,255,0.05);
      border:1px solid rgba(255,255,255,0.08);
      color:rgba(255,255,255,0.75);text-decoration:none;
      font-size:0.82rem;font-weight:600;transition:0.2s;
    }
    .soc-link:hover{background:${primaryColor}22;color:#fff;border-color:${primaryColor}44;}

    /* Footer */
    .footer-bar{
      text-align:center;padding:24px 0;
      color:rgba(255,255,255,0.35);font-size:0.82rem;
      border-top:1px solid rgba(255,255,255,0.06);
    }

    @media(max-width:768px){
      .overlay-nav{padding:12px 16px;flex-direction:column;gap:8px;}
      .overlay-hero{bottom:5%;padding:0 16px;}
      .hero-photo{width:100px;height:100px;right:10px;bottom:6%;}
      .sections{padding:24px 16px 0;}
      .stats-row{gap:10px;}
      .stat{min-width:100px;padding:14px 16px;}
    }
  </style>
</head>
<body>
  <!-- ===== ORIGINAL TEMPLATE AS FULL BACKGROUND ===== -->
  <div class="template-bg">
    <img class="bg-img" src="${templateImageUrl}" alt="${brandName} template" />

    <!-- Nav overlay -->
    <nav class="overlay-nav">
      <div class="brand">
        <div class="brand-logo">${logoImageUrl ? `<img src="${logoImageUrl}" alt="logo"/>` : `<span class="letter">${brandName.charAt(0)}</span>`}</div>
        <span class="brand-name">${brandName}</span>
      </div>
      ${menuHTML ? `<div class="nav-links">${menuHTML}</div>` : ""}
    </nav>

    <!-- Hero text overlay -->
    <div class="overlay-hero">
      <h1><span class="acc">${headline}</span></h1>
      <p>${subheadline}</p>
      <a href="#" class="cta-btn">${ctaText}</a>
    </div>

    <!-- Uploaded hero photo -->
    ${heroImageUrl ? `<img class="hero-photo" src="${heroImageUrl}" alt="${brandName}" />` : ""}
  </div>

  <!-- ===== EXTRA SECTIONS BELOW ===== -->
  ${(statsHTML || testimonialHTML || socialHTML) ? `
  <div class="sections">
    <div class="section-inner">
      ${statsHTML ? `<div class="stats-row">${statsHTML}</div>` : ""}
      ${testimonialHTML}
      ${socialHTML ? `<div class="social-bar">${socialHTML}</div>` : ""}
    </div>
    <div class="footer-bar">© ${new Date().getFullYear()} ${brandName}</div>
  </div>` : ""}
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
    backgroundColor: "#000",
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
