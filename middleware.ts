export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/tasks/:path*",
    "/shopping/:path*",
    "/settings/:path*",
  ],
};
