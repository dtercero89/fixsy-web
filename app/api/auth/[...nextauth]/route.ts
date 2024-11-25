import { NextRequest } from 'next/server'
import { handlers } from "@/auth"

export const GET = handlers.GET
export const POST = handlers.POST

export async function HEAD(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, HEAD, OPTIONS',
      'Content-Type': 'application/json',
    },
  })
}