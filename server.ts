import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  BedrockRuntimeClient,
  InvokeModelCommand
} from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Amazon Bedrock Runtime client
  // Uses AWS credentials from environment variables:
  //   AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
  const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  });

  // ---------------------------------------------------------------------------
  // AI Money Coach Endpoint — powered by Amazon Bedrock (Claude via Kiro AI)
  // ---------------------------------------------------------------------------
  app.post('/api/ai-coach', async (req, res) => {
    try {
      const { message, mentor, tone, userData } = req.body;

      const systemPrompt = `You are the AI Money Coach in the "Money Boss AI" mobile application, powered by Amazon Bedrock via Kiro.
You speak directly to the user about their real personal financial data.

Current Mentor Context:
- Mentor Name: ${mentor?.name || 'Father'}
- Mentor Personality: ${mentor?.personality || 'Serious, intimidating, disciplined'}
- Tone Mode: ${tone === 'mentor' ? 'Roleplay strongly as this mentor character using their voice and signature catchphrases' : 'Neutral, encouraging professional financial advisor tone'}
- Mentor Signature Quote: "${mentor?.quote || 'Discipline beats impulse.'}"

User's Live Financial State:
- Base Currency: ${userData?.currency || 'INR'}
- Total Balance: ${userData?.currency || '₹'}${userData?.balance?.toLocaleString() || '47,820'}
- Pocket Money Remaining: ${userData?.currency || '₹'}${userData?.pmLeft?.toLocaleString() || '3,200'} out of ${userData?.currency || '₹'}${userData?.pmTotal?.toLocaleString() || '5,900'}
- Active Savings Goal: ${userData?.goalTitle || 'Save ₹10,000'} (${userData?.goalProgress || 68}% completed)
- Kinetic Points (KP): ${userData?.kp || 2450} KP
- Multiplier: ${userData?.multiplier || 2.4}x
- Active Streak: ${userData?.streak || 7} Days No-Overspend

Instructions for response:
1. Ground your advice directly in the provided user financial stats.
2. Keep responses concise (2-4 sentences max), punchy, and mobile-friendly.
3. If tone mode is "mentor", embrace the character's personality (e.g. Mother guilt-trips; Sister teases; Father preaches discipline; Brother encourages).
4. Provide actionable advice for staying on budget or hitting savings goals.`;

      // Amazon Bedrock — Claude 3 Sonnet model ID
      // Model: anthropic.claude-3-sonnet-20240229-v1:0
      // Uses the Messages API format for Anthropic models on Bedrock
      const requestBody = {
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 256,
        temperature: tone === 'mentor' ? 0.8 : 0.4,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      };

      const command = new InvokeModelCommand({
        modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(requestBody)
      });

      const bedrockResponse = await bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(bedrockResponse.body));
      const replyText =
        responseBody?.content?.[0]?.text ||
        "Keep your eyes on your financial goals. Every rupee counts!";

      res.json({ reply: replyText });
    } catch (error: any) {
      console.error('AI Coach API Error (Amazon Bedrock):', error);
      res.status(500).json({
        reply: 'My financial radar encountered a small glitch. Stay focused on your budget while I reconnect via AWS!',
        error: error.message
      });
    }
  });

  // ---------------------------------------------------------------------------
  // Vite dev middleware (development) / Static file serving (production)
  // ---------------------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Money Boss AI (Kiro + Amazon Bedrock) running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
