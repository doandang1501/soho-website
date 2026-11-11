import { NextResponse } from "next/server";
import { GOHOST_CONFIG } from "@/lib/gohost";

export const dynamic = "force-dynamic";

export async function GET() {
  const envCheck = {
    GOHOST_API_BASE_URL: process.env.GOHOST_API_BASE_URL || "(missing)",
    GOHOST_PROPERTY_ID: process.env.GOHOST_PROPERTY_ID || "(missing)",
    GOHOST_DEFAULT_BOOKING_SOURCE: process.env.GOHOST_DEFAULT_BOOKING_SOURCE || "(missing)",
    hasApiKey: !!process.env.GOHOST_API_KEY,
    apiKeyLength: process.env.GOHOST_API_KEY ? process.env.GOHOST_API_KEY.length : 0,
    apiKeyPrefix: process.env.GOHOST_API_KEY ? process.env.GOHOST_API_KEY.substring(0, 8) + "..." : "none",
    hasApiSecret: !!process.env.GOHOST_API_SECRET,
    apiSecretLength: process.env.GOHOST_API_SECRET ? process.env.GOHOST_API_SECRET.length : 0,
    apiSecretPrefix: process.env.GOHOST_API_SECRET ? process.env.GOHOST_API_SECRET.substring(0, 8) + "..." : "none",
    resolvedConfig: {
      baseUrl: GOHOST_CONFIG.baseUrl,
      propertyId: GOHOST_CONFIG.propertyId,
      hasKey: !!GOHOST_CONFIG.apiKey,
      hasSecret: !!GOHOST_CONFIG.apiSecret,
    },
  };

  return NextResponse.json(envCheck);
}

