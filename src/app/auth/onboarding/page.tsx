import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
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

  const t = await getTranslations("onboarding");

  const genderItems = [
    { label: t("gender.male"), value: "male" },
    { label: t("gender.female"), value: "female" },
    { label: t("gender.other"), value: "other" },
  ];

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
      <AuthHeading title={t("title")} description={t("description")} />

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
          label={t("date-of-birth.label")}
          placeholder={t("date-of-birth.placeholder")}
        />

        <Select
          required
          name="gender"
          label={t("gender.label")}
          items={genderItems}
          placeholder={t("gender.placeholder")}
        />

        <NumberInput
          required
          name="height"
          min={50}
          max={300}
          label={t("height.label")}
          placeholder={t("height.placeholder")}
        />

        <Button type="submit" size="lg" className={css({ mt: "1", w: "full" })}>
          {t("continue")}
        </Button>
      </form>
    </>
  );
}
