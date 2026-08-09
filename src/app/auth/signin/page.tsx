import { redirect } from "next/navigation";

import { GoogleLogo } from "@/components/google-logo";
import { PulseLogo } from "@/components/pulse-logo";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { css } from "@/styled-system/css";

export default function Page() {
  async function handleSignIn() {
    "use server";

    const { url } = await auth.api.signInSocial({
      body: { provider: "google", callbackURL: "/" },
    });

    if (url) {
      redirect(url);
    }
  }

  return (
    <main
      className={css({
        alignItems: "center",
        bgGradient: "to-b",
        display: "flex",
        gradientFrom: "colorPalette.2",
        gradientTo: "colorPalette.1",
        justifyContent: "center",
        minH: "dvh",
        px: "4",
      })}
    >
      <div
        className={css({
          alignItems: "center",
          bg: "bg.default",
          borderColor: "border.subtle",
          borderRadius: "2xl",
          borderWidth: "1px",
          boxShadow: "lg",
          display: "flex",
          flexDirection: "column",
          gap: "6",
          maxW: "sm",
          px: "8",
          py: "10",
          textAlign: "center",
          w: "full",
        })}
      >
        <PulseLogo className={css({ boxSize: "14" })} />

        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1.5",
          })}
        >
          <h1
            className={css({
              color: "fg.default",
              fontWeight: "bold",
              textStyle: "2xl",
            })}
          >
            Welcome to Pulse
          </h1>
          <p className={css({ color: "fg.muted", textStyle: "sm" })}>
            Sign in to track the signals
          </p>
        </div>

        <form action={handleSignIn} className={css({ w: "full" })}>
          <Button type="submit" size="lg" w="full">
            <GoogleLogo className={css({ boxSize: "5" })} />
            Continue with Google
          </Button>
        </form>

        <p
          className={css({
            color: "fg.subtle",
            textStyle: "xs",
          })}
        >
          Your data stays yours. We only use Google to sign you in.
        </p>
      </div>
    </main>
  );
}
