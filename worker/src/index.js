const UPSTREAM = 'https://openrouter.ai/api/v1/chat/completions';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: CORS });
    }

    const key = env.OPENROUTER_KEY;
    if (!key) {
      return new Response('AI service unavailable', { status: 500, headers: CORS });
    }

    let upstream;
    try {
      upstream = await fetch(UPSTREAM, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': request.headers.get('origin') ?? 'https://iamtredir.com',
          'X-Title': 'Portfolio Terminal',
        },
        body: request.body,
      });
    } catch {
      return new Response('Upstream fetch failed', { status: 502, headers: CORS });
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...CORS,
        'Content-Type': upstream.headers.get('Content-Type') ?? 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  },
};
