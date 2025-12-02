import postgres from 'postgres';

// Manual Type Definitions to bypass @vercel/node dependency issues
type ApiRequest = {
  method?: string;
  body?: {
    text?: string;
  };
};

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(data: unknown): void;
  end(): void;
}

// Initialize the connection using the Secret Environment Variable
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export default async function handler(req: ApiRequest, res: ApiResponse) {
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
      const { text } = req.body || {}; // Safety check in case body is undefined
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