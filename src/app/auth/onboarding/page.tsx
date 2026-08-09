import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { AuthHeading } from "@/components/auth-heading";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { NumberInput } from "@/components/ui/number-input";
import { Select } from "@/components/ui/select";
import { auth } from "@/lib/auth";
import { isProfileComplete } from "@/lib/profile";
import { css } from "@/styled-system/css";

const profileSchema = z.object({
  dateOfBirth: z.coerce.date().max(new Date()),
  gender: z.enum(["male", "female", "other"]),
  height: z.coerce.number().int().min(50).max(300),
});

const genderItems = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  if (isProfileComplete(session.user)) {
    redirect("/");
  }

  const today = new Date().toISOString().slice(0, 10);

  async function completeProfile(formData: FormData) {
    "use server";

    const parsed = profileSchema.safeParse({
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      height: formData.get("height"),
    });

    if (!parsed.success) {
      redirect("/auth/onboarding");
    }

    await auth.api.updateUser({
      headers: await headers(),
      body: parsed.data,
    });

    redirect("/");
  }

  return (
    <>
      <AuthHeading
        title="Tell us about you"
        description="We use this to personalize your metrics"
      />

      <form
        action={completeProfile}
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "5",
        })}
      >
        <DatePicker
          required
          name="dateOfBirth"
          max={today}
          label="Date of birth"
          placeholder="YYYY-MM-DD"
        />

        <Select
          required
          name="gender"
          label="Gender"
          items={genderItems}
          placeholder="Select gender"
        />

        <NumberInput
          required
          name="height"
          min={50}
          max={300}
          label="Height (cm)"
          placeholder="175"
        />

        <Button type="submit" size="lg" w="full" mt="1">
          Continue
        </Button>
      </form>
    </>
  );
}
