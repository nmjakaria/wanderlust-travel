import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'


// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    // if (!session) {
    //     return NextResponse.redirect(new URL('/login?message=Please login to view your bookings&type=error', request.url))
    // }
    if (!session) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('message', 'Please login to view this page')
        loginUrl.searchParams.set('type', 'error')

        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/my-bookings', '/destinations/:path', '/add-destination'],
}