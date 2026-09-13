import { getAuthState } from "@/lib/auth/session";
import { SiteHeaderClient } from "@/components/layout/SiteHeaderClient";

export async function SiteHeader() {
  const { user, isAdmin } = await getAuthState();
  return <SiteHeaderClient isSignedIn={Boolean(user)} isAdmin={isAdmin} />;
}
