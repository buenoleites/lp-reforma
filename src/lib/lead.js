/* Envio do lead para o webhook do n8n + redirecionamento para a página de
   obrigado, no mesmo formato usado pelas LPs da Unyflex. */

const WEBHOOK_URL = "https://n8n.unyflex.com.br/webhook/lp-leads-unyflex";
const REDIRECT_URL = "https://landingpages.unyflex.com.br/obrigado";
const FORM_ID = "lp-reforma-tributaria";

// "YYYY-MM-DD HH:MM:SS" (horário local)
function nowStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function getDevice() {
  if (typeof navigator === "undefined") return "Desktop";
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
    ? "Mobile"
    : "Desktop";
}

// IP + país/região/cidade (best-effort; não bloqueia o envio se falhar).
async function getGeo() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1500);
    const res = await fetch("https://ipwho.is/", { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return {};
    const d = await res.json();
    if (d && d.success === false) return {};
    return {
      ip: d.ip || "",
      country_code: d.country_code || "",
      region: d.region || "",
      city: d.city || "",
    };
  } catch {
    return {};
  }
}

/** Monta o payload e envia para o webhook do n8n. */
export async function submitLead(form) {
  const q = new URLSearchParams(window.location.search);
  const geo = await getGeo();

  const payload = {
    Nome: form.nome,
    E_mail: form.email,
    WhatsApp: form.whatsapp,
    Cargo_Setor: form.cargo,
    Orgao_Municipio: form.orgao,
    Orgao_Publico: "",
    Referral_Source: document.referrer || "",
    Dispositivo: getDevice(),
    URL: window.location.href,
    IP_do_usuario: geo.ip || "",
    Data_da_conversao: nowStamp(),
    Id_do_formulario: FORM_ID,
    Pais_do_usuario: geo.country_code || "",
    Regiao_do_usuario: geo.region || "",
    Cidade_do_usuario: geo.city || "",
    UTM_Source: q.get("utm_source") || "",
    UTM_Medium: q.get("utm_medium") || "",
    UTM_Campaign: q.get("utm_campaign") || "",
    UTM_Id: q.get("utm_id") || "",
    UTM_Term: q.get("utm_term") || "",
    UTM_Content: q.get("utm_content") || "",
  };

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  });
}

/** Redireciona para /obrigado com os dados do formulário na query string. */
export function redirectToThankYou(form) {
  const params = new URLSearchParams({
    Nome: form.nome,
    E_mail: form.email,
    WhatsApp: form.whatsapp,
    Cargo_Setor: form.cargo,
    Orgao_Municipio: form.orgao,
  });
  window.location.href = `${REDIRECT_URL}?${params.toString()}`;
}
