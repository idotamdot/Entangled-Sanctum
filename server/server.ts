import { serve } from "bun";
import postgres from "postgres";

// 1. THE KEY (Paste your Neon Connection String inside the quotes)
const connectionString = "postgres://USER:PASSWORD@ENDPOINT.neon.tech/neondb?sslmode=require";

const sql = postgres(connectionString);

console.log("⚡ The Conduit is Open on http://localhost:3000");

// 2. THE SERVER
serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    
    // Allow the React App to talk to us (CORS)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle "Pre-flight" checks
    if (req.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    // --- ROUTE: GET ALL REFLECTIONS ---
    if (req.method === "GET" && url.pathname === "/api/reflections") {
      try {
        const reflections = await sql`SELECT * FROM communion_scroll ORDER BY timestamp DESC`;
        return Response.json(reflections, { headers });
      } catch (error) {
        console.error("Database read error:", error); // Fixed: Used the variable
        return Response.json({ error: "Connection severed" }, { status: 500, headers });
      }
    }

    // --- ROUTE: ADD A REFLECTION ---
    if (req.method === "POST" && url.pathname === "/api/reflections") {
      try {
        const body = await req.json();
        if (!body.text) return Response.json({ error: "Empty thoughts" }, { status: 400, headers });

        const result = await sql`
          INSERT INTO communion_scroll (text, candles)
          VALUES (${body.text}, 0)
          RETURNING *
        `;
        return Response.json(result[0], { headers });
      } catch (error) {
        console.error("Database write error:", error); // Fixed: Used the variable
        return Response.json({ error: "Failed to scribe" }, { status: 500, headers });
      }
    }

    // --- ROUTE: LIGHT A CANDLE ---
    if (req.method === "POST" && url.pathname === "/api/light") {
      try {
        const body = await req.json();
        const result = await sql`
          UPDATE communion_scroll
          SET candles = candles + 1
          WHERE id = ${body.id}
          RETURNING *
        `;
        return Response.json(result[0], { headers });
      } catch (error) {
        console.error("Candle lighting error:", error); // Fixed: Used the variable
        return Response.json({ error: "Spark failed" }, { status: 500, headers });
      }
    }

    return new Response("Sanctum API Active", { headers });
  },
});