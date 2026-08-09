import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PulseLogo } from "@/components/pulse-logo";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { css } from "@/styled-system/css";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  async function handleSignOut() {
    "use server";

    await auth.api.signOut({ headers: await headers() });
    redirect("/auth/signin");
  }

  return (
    <div>
      <header
        className={css({
          alignItems: "center",
          borderBottomWidth: "1px",
          borderColor: "border.subtle",
          display: "flex",
          justifyContent: "space-between",
          px: "6",
          py: "3",
        })}
      >
        <PulseLogo className={css({ boxSize: "8" })} />

        <div
          className={css({ alignItems: "center", display: "flex", gap: "4" })}
        >
          <span className={css({ color: "fg.muted", textStyle: "sm" })}>
            {session.user.name}
          </span>
          <form action={handleSignOut}>
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </header>
    </div>
  );
}
