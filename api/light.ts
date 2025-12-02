import postgres from 'postgres';

// Manual Types adapted for the Candle Logic
type ApiRequest = {
  method?: string;
  body?: {
    id?: number;
  };
};

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(data: unknown): void;
  end(): void;
}

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'No candle specified' });

      const result = await sql`
        UPDATE communion_scroll
        SET candles = candles + 1
        WHERE id = ${id}
        RETURNING *
      `;
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Spark failed' });
    }
  }
}