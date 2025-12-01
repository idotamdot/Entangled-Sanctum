import { VercelRequest, VercelResponse } from '@vercel/node';
import postgres from 'postgres';

// Initialize the connection using the Secret Environment Variable
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers so the frontend can talk to us
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // READ THE SCROLL
      const reflections = await sql`SELECT * FROM communion_scroll ORDER BY timestamp DESC`;
      return res.status(200).json(reflections);
    } 
    
    if (req.method === 'POST') {
      // SCRIBE A NEW THOUGHT
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: 'Empty thought' });

      const result = await sql`
        INSERT INTO communion_scroll (text, candles)
        VALUES (${text}, 0)
        RETURNING *
      `;
      return res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'The wire is broken' });
  }
}