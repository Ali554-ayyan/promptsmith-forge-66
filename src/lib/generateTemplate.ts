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

export function generateHTML(data: TemplateData): string {
  const menuHTML = data.menuItems
    .filter((m) => m.label)
    .map((m) => `<a href="${m.url || '#'}" style="color:${data.accentColor};text-decoration:none;margin:0 16px;font-weight:500;transition:opacity .2s" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">${m.label}</a>`)
    .join("");

  const statsHTML = data.stats
    .filter((s) => s.number || s.label)
    .map((s) => `<div style="text-align:center;padding:24px"><div style="font-size:2.5rem;font-weight:800;color:${data.accentColor}">${s.number}</div><div style="font-size:0.875rem;opacity:0.8;margin-top:4px">${s.label}</div></div>`)
    .join("");

  const testimonialHTML = data.testimonialQuote
    ? `<section style="padding:80px 24px;text-align:center;max-width:700px;margin:0 auto">
        <p style="font-size:1.25rem;font-style:italic;opacity:0.9;line-height:1.8">"${data.testimonialQuote}"</p>
        ${data.testimonialName ? `<p style="margin-top:16px;font-weight:600;color:${data.accentColor}">— ${data.testimonialName}</p>` : ""}
      </section>`
    : "";

  const logoImg = data.logoDataUrl
    ? `<img src="${data.logoDataUrl}" alt="Logo" style="height:40px;object-fit:contain" />`
    : `<span style="font-size:1.25rem;font-weight:800;color:${data.primaryColor}">${data.businessName}</span>`;

  const heroImg = data.heroDataUrl
    ? `<img src="${data.heroDataUrl}" alt="Hero" style="width:100%;max-width:600px;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.4)" />`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${data.businessName} — ${data.headline}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Inter',sans-serif;background:#0a1428;color:#e2e8f0;overflow-x:hidden}
    nav{display:flex;align-items:center;justify-content:space-between;padding:20px 48px;background:rgba(10,20,40,0.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.06);position:sticky;top:0;z-index:50}
    .hero{min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px;position:relative}
    .hero::before{content:'';position:absolute;width:500px;height:500px;background:${data.primaryColor};opacity:0.08;border-radius:50%;filter:blur(120px);top:10%;left:50%;transform:translateX(-50%)}
    .cta-btn{display:inline-block;padding:16px 40px;background:linear-gradient(135deg,${data.primaryColor},${data.accentColor});color:#0a1428;font-weight:700;font-size:1rem;border:none;border-radius:12px;cursor:pointer;text-decoration:none;transition:transform .2s,box-shadow .2s;box-shadow:0 0 30px ${data.primaryColor}44}
    .cta-btn:hover{transform:translateY(-2px);box-shadow:0 0 50px ${data.primaryColor}66}
    .stats-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:40px;padding:60px 24px;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06)}
    footer{text-align:center;padding:40px 24px;opacity:0.5;font-size:0.875rem;border-top:1px solid rgba(255,255,255,0.06)}
    @media(max-width:768px){nav{padding:16px 20px;flex-direction:column;gap:12px}.hero h1{font-size:2rem!important}.stats-grid{flex-direction:column;align-items:center}}
  </style>
</head>
<body>
  <nav>
    ${logoImg}
    <div>${menuHTML}</div>
  </nav>

  <section class="hero">
    <h1 style="font-size:3.5rem;font-weight:900;line-height:1.1;max-width:800px;background:linear-gradient(135deg,${data.primaryColor},${data.accentColor});-webkit-background-clip:text;-webkit-text-fill-color:transparent">${data.headline}</h1>
    <p style="margin-top:24px;font-size:1.2rem;max-width:600px;opacity:0.8;line-height:1.7">${data.subheadline}</p>
    <a href="#" class="cta-btn" style="margin-top:40px">${data.ctaText || "GET STARTED"}</a>
    ${heroImg ? `<div style="margin-top:60px">${heroImg}</div>` : ""}
  </section>

  ${statsHTML ? `<div class="stats-grid">${statsHTML}</div>` : ""}

  ${testimonialHTML}

  <footer>© ${new Date().getFullYear()} ${data.businessName} — Built with LandingForge ❤️</footer>
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

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
