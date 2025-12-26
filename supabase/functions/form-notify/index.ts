// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
// supabase/functions/form-notify/index.ts

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // 方便从前端直接调用，正式环境可改为你的域名
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch (_err) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  const { name, email, message } = body;

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    return new Response(
      JSON.stringify({ error: "RESEND_API_KEY is not set" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  // 这里写你的接收通知的邮箱
  const toAddress = "dogiant@gmail.com";

  // 使用 Resend 验证过的域名
  // 优先使用环境变量 RESEND_FROM_EMAIL（如果设置了自定义域名）
  // 否则使用已验证的自定义域名 notifications.dcxy.jp
  const fromAddress = Deno.env.get("RESEND_FROM_EMAIL") || 
    "大成学院フォーム通知 <noreply@notifications.dcxy.jp>";

  console.log("Sending email notification:", {
    from: fromAddress,
    to: toAddress,
    name,
    email,
  });

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toAddress],
      subject: "【大成学院】新しいフォーム送信があります",
      html: `
        <h2>大成学院 フォーム送信</h2>
        <p><strong>お名前:</strong> ${name ?? ""}</p>
        <p><strong>メールアドレス:</strong> ${email ?? ""}</p>
        <p><strong>メッセージ:</strong></p>
        <p>${(message ?? "").replace(/\n/g, "<br>")}</p>
      `,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend error:", {
      status: resendResponse.status,
      statusText: resendResponse.statusText,
      error: errorText,
      from: fromAddress,
    });

    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        detail: errorText,
        status: resendResponse.status,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  const resendData = await resendResponse.json();
  console.log("Email sent successfully:", resendData);

  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
});


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/form-notify' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
