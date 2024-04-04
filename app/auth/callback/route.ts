import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        // authenticate user and set a cookie with app to sign them in
        const supabase = createRouteHandlerClient<Database>({ cookies })
        await supabase.auth.exchangeCodeForSession(code)
    }

    // Redirect our use back to the application
    return NextResponse.redirect(requestUrl.origin)
}