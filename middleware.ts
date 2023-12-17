import React from 'react'
import { NextRequest, NextResponse } from "next/server";
import { cookies , headers } from 'next/headers'
import Footer from "./components/Footer";


export default async function middkeWare(request: NextRequest) {

    const cookieStore = cookies()
    const cookie = cookieStore.get('auth_token')
    console.log(cookie);
    const url = request.nextUrl.clone()
    url.pathname = '/Test'
    return NextResponse.redirect(url)
}

export const config = {
    matcher: ['/AuthSuccess'],
  }