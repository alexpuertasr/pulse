import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

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
    <form action={handleSignIn}>
      <button type="submit">Sign In</button>
    </form>
  );
}
