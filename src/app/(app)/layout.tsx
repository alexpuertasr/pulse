import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/lib/auth";
import { isProfileComplete } from "@/lib/profile";
import { css } from "@/styled-system/css";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  if (!isProfileComplete(session.user)) {
    redirect("/auth/onboarding");
  }

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: { base: "column", md: "row" },
        maxW: "7xl",
        minH: "dvh",
        mx: "auto",
      })}
    >
      <AppSidebar
        user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }}
      />
      <main
        className={css({
          flex: "1",
          minW: "0",
          px: { base: "4", md: "8" },
          py: { base: "6", md: "10" },
        })}
      >
        {children}
      </main>
    </div>
  );
}
