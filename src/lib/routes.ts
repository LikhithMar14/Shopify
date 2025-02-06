/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/","test","/login","/signup","/product/*","/cart", "/auth/session"
];
export const allowRoutes = [
  "/product"
]
  
  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged in users to /settings
   * @type {string[]}
   */
  export const authRoutes = [
    "/login",
    "/signup",
    "/api/auth/signin"

  ];
  export const apiAuthPrefix = "/api/auth";

  
  /**
   * @type {string}
   */

  
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  export const DEFAULT_LOGIN_REDIRECT = "/";