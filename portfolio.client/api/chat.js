export const config = { runtime: 'edge' };

const UPSTREAM = 'https://openrouter.ai/api/v1/chat/completions';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const key = process.env.OPENROUTER_KEY;
  if (!key) {
    return new Response('AI service unavailable', { status: 500 });
  }

  const body = await req.text();

  let upstream;
  try {
    upstream = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers.get('origin') ?? 'https://iamtredir.com',
        'X-Title': 'Portfolio Terminal',
      },
      body,
    });
  } catch (err) {
    return new Response('Upstream fetch failed', { status: 502 });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
