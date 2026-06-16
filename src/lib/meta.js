// Integração com Meta Pixel (browser) + Conversions API (CAPI).
//
// Deduplicação: ambos os canais recebem o mesmo event_id gerado aqui.
// O Meta descarta automaticamente o duplicado, mantendo a contagem correta.
//
// Segurança: VITE_META_ACCESS_TOKEN fica exposto no bundle JS do cliente.
// Para PageView isso é amplamente aceito. Para eventos com dados de usuário
// (ex.: lead submetido), prefira chamar a CAPI de um backend (n8n).

const PIXEL_ID = '1168799437651546';
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

function genEventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function trackBrowser(eventName, eventId) {
  if (typeof window.fbq !== 'function') return;
  window.fbq('track', eventName, {}, { eventID: eventId });
}

async function trackCapi(eventName, eventId) {
  const token = import.meta.env.VITE_META_ACCESS_TOKEN;
  if (!token) return;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: window.location.href,
        action_source: 'website',
      },
    ],
  };

  try {
    await fetch(`${CAPI_URL}?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // best-effort: falha silenciosa para não impactar a experiência do usuário
  }
}

// Dispara um evento pelo pixel do browser E pela CAPI com o mesmo event_id.
export function trackEvent(eventName) {
  const eventId = genEventId();
  trackBrowser(eventName, eventId);
  trackCapi(eventName, eventId);
}
