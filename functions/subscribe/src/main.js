function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async ({ req, res, log, error }) => {
  if (req.method !== 'POST') {
    return res.json({ ok: false, error: 'Method not allowed' }, 405);
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const email = body && body.email;
  if (!isValidEmail(email)) {
    return res.json({ ok: false, error: 'A valid email is required' }, 400);
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!apiKey || !groupId) {
    error('Missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID env var');
    return res.json({ ok: false, error: 'Server misconfiguration' }, 500);
  }

  try {
    const mlRes = await fetch(`https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`, {
      method: 'POST',
      headers: {
        'X-MailerLite-ApiKey': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, resubscribe: true }),
    });

    if (!mlRes.ok) {
      const detail = await mlRes.text();
      error(`MailerLite error ${mlRes.status}: ${detail}`);
      return res.json({ ok: false, error: 'Failed to subscribe' }, 502);
    }

    log(`Subscribed ${email} to group ${groupId}`);
    return res.json({ ok: true });
  } catch (e) {
    error(`MailerLite request failed: ${e.message}`);
    return res.json({ ok: false, error: 'Failed to subscribe' }, 502);
  }
};
