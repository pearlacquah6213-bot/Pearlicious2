import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  // API Routes for Aura Ghana Backend
  
  // Payment Initialization (Paystack / Mobile Money simulation)
  app.post('/api/payments/initialize', (req, res) => {
    const { email, amount, provider, phone, orderId } = req.body;
    if (!email || !amount) {
      return res.status(400).json({ success: false, error: 'Email and amount are required' });
    }

    const reference = `AURA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const authorizationUrl = `https://checkout.paystack.com/pay/${reference}`;

    // Simulate successful server-side initialization
    return res.json({
      success: true,
      data: {
        authorization_url: authorizationUrl,
        reference,
        access_code: `acc_${Math.random().toString(36).substring(2, 10)}`,
        message: `Payment initialized successfully for ${provider || 'Card'} (${phone || email})`
      }
    });
  });

  // Payment Verification
  app.post('/api/payments/verify', (req, res) => {
    const { reference } = req.body;
    if (!reference) {
      return res.status(400).json({ success: false, error: 'Payment reference is required' });
    }

    // Server-side verification check
    setTimeout(() => {
      return res.json({
        success: true,
        data: {
          status: 'success',
          reference,
          gateway_response: 'Successful',
          paid_at: new Date().toISOString(),
          channel: 'momo_gh',
          currency: 'GHS',
          amount: 45000 // in pesewas
        }
      });
    }, 500);
  });

  // Webhook endpoint
  app.post('/api/webhook/paystack', (req, res) => {
    const event = req.body;
    console.log('Received Paystack Webhook Event:', event.event);
    return res.status(200).json({ received: true });
  });

  // Fallback to index.html for SPA routes
  app.use('*', async (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(url, '');
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura Ghana server running on http://localhost:${PORT}`);
  });
}

startServer();
