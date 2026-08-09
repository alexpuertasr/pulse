import { redirect } from "next/navigation";

import { AuthHeading } from "@/components/auth-heading";
import { GoogleLogo } from "@/components/google-logo";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { css } from "@/styled-system/css";

export default function Page() {
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
      <AuthHeading
        title="Welcome to Pulse"
        description="Sign in to track the signals"
      />

      <form action={handleSignIn} className={css({ w: "full" })}>
        <Button type="submit" size="lg" w="full">
          <GoogleLogo className={css({ boxSize: "5" })} />
          Continue with Google
        </Button>
      </form>

      <p
        className={css({
          color: "fg.subtle",
          textAlign: "center",
          textStyle: "xs",
        })}
      >
        Your data stays yours. We only use Google to sign you in.
      </p>
    </>
  );
}
