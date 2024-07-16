// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   secret: process.env.SECRET,
//   pages: {
//     signIn: "/auth/login",
//   },
//   // callbacks: {
//   //   authorized: ({ token }) => !!token,
//   // },
// });

// export const config = {
//   matcher: ["/sample/:path*"],
// };
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  try {
    console.log("🟦 referer", requestHeaders.get("referer"));
  } catch (error: Error | any) {
    console.log("initial error", error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
