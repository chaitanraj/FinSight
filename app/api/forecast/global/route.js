export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.ML_SERVER}/forecast/global`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error("Global forecast error:", err);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
