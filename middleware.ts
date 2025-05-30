import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECT_ENABLED:string | undefined = process.env.REDIRECT_ENABLED;
 
const MAIN_APP_URL = process.env.MAIN_APP_URL || "https://dev.near.org/applications";

// console.log("IS REDIRECT_ENABLED: ", REDIRECT_ENABLED);

export function middleware(request: NextRequest) {

    if( REDIRECT_ENABLED == "false" || REDIRECT_ENABLED == undefined) {
        console.log("Developement mode, REDIRECT is disabled");
        return NextResponse.next();
    }
    const { pathname } = request.nextUrl;


    if (request.headers.get("sec-fetch-dest") === "iframe") {
        return NextResponse.next();
    }

    if (pathname.startsWith("/project")) {
        const projectId = pathname.split("/")[2];
        return NextResponse.redirect(
            projectId == 'trending' ? `${MAIN_APP_URL}?page=${projectId}` : `${MAIN_APP_URL}?id=${projectId}`
        );
    }

    if (pathname.startsWith("/search")) {
        return NextResponse.redirect(
            `${MAIN_APP_URL}?page=search`
        );
    }

    if (pathname.startsWith("/trending")) {
        return NextResponse.redirect(
            `${MAIN_APP_URL}?page=trending`
        );
    }

    // Redirect to nearcatalog.xyz if directly  hit the iframe.nearcatalog.xyz domain
    if (pathname === "/") {
        return NextResponse.redirect(
            `https://nearcatalog.xyz`
        , 301);
    }
    console.log("middleware trigged " + pathname);
    return NextResponse.next();

}

export const config = {
    matcher: ["/project/:path*", "/search", "/trending" , "/"],
};