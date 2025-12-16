import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title || title.length < 5) {
      return Response.json({ error: "Task too short" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ FAST & FREE
      messages: [
        {
          role: "system",
          content:
            "Correct grammar and spelling. Return ONLY the corrected sentence. No explanations.",
        },
        {
          role: "user",
          content: title,
        },
      ],
      temperature: 0.4,
    });

    const text = completion.choices[0]?.message?.content || "";

    const tasks = text
      .split("\n")
      .map((t) => t.replace(/^[•\-*]\s*/, "").trim())
      .filter(Boolean);

    return Response.json({ tasks });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Groq AI failed" }, { status: 500 });
  }
}
