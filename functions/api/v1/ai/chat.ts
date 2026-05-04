export async function onRequestPost({ request, env }) {
  try {
    const { messages, systemInstruction } = await request.json();

    const apiKey = env.AICC_API_KEY;
    const apiUrl = env.AICC_API_URL || "https://api.ai.cc/v1";

    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Or your preferred model
        messages: [
          { role: "system", content: systemInstruction },
          ...messages.map(m => ({ 
            role: m.role === "user" ? "user" : "assistant", 
            content: m.content 
          }))
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: err }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ text: data.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
