import React from "react";
import { Redirect } from "expo-router";

/**
 * allow:
 *   - true  => render children
 *   - false => redirect
 *   - null/undefined => show fallback (loading)
 */
export default function RedirectGate({
  allow,
  redirectTo = "/",
  fallback = null,
  children,
}) {
  if (allow == null) return fallback;
  if (!allow) return <Redirect href={redirectTo} />;
  return children;
}