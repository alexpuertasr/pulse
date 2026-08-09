import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { AuthHeading } from "@/components/auth-heading";
import { GoogleLogo } from "@/components/google-logo";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { css } from "@/styled-system/css";

export default async function Page() {
  const t = await getTranslations("signin");

  async function handleSignIn() {
    "use server";

    const { url } = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: "/",
        newUserCallbackURL: "/auth/onboarding",
      },
    });

    if (url) {
      redirect(url);
    }
  }

  return (
    <>
      <AuthHeading title={t("title")} description={t("description")} />

      <form action={handleSignIn} className={css({ w: "full" })}>
        <Button type="submit" size="lg" w="full">
          <GoogleLogo className={css({ boxSize: "5" })} />
          {t("continue-with-google")}
        </Button>
      </form>

      <p
        className={css({
          color: "fg.subtle",
          textAlign: "center",
          textStyle: "xs",
        })}
      >
        {t("privacy-note")}
      </p>
    </>
  );
}
