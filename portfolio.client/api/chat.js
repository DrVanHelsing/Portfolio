// Vercel Node.js Serverless Function — proxies OpenRouter server-side.
// Edge Runtime is NOT used because Vite framework preset doesn't auto-deploy api/ Edge Functions.

const UPSTREAM = 'https://openrouter.ai/api/v1/chat/completions';

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  const key = process.env.OPENROUTER_KEY;
  if (!key) {
    res.status(500).end('AI service unavailable');
    return;
  }

  // Collect request body from the Node.js readable stream
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const body = Buffer.concat(chunks).toString('utf-8');

  let upstream;
  try {
    upstream = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers['origin'] ?? 'https://iamtredir.com',
        'X-Title': 'Portfolio Terminal',
      },
      body,
    });
  } catch {
    res.status(502).end('Upstream fetch failed');
    return;
  }

  res.status(upstream.status);
  res.setHeader('Content-Type', upstream.headers.get('Content-Type') ?? 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no'); // prevent CDN/Nginx buffering of the SSE stream

  const reader = upstream.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  } catch {
    // client disconnected or stream error — end cleanly
  } finally {
    res.end();
  }
}
