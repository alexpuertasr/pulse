import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { NumberInput } from "@/components/ui/number-input";
import { Select } from "@/components/ui/select";
import { auth } from "@/lib/auth";
import { css } from "@/styled-system/css";

const sectionTitleStyles = css({
  color: "fg.default",
  fontWeight: "semibold",
  textStyle: "lg",
});

const sectionDescriptionStyles = css({
  color: "fg.muted",
  mt: "1",
  textStyle: "sm",
});

const cardStyles = css({
  bg: "bg.default",
  borderColor: "border.subtle",
  borderRadius: "xl",
  borderWidth: "1px",
  display: "flex",
  flexDirection: "column",
  gap: "5",
  p: "6",
});

const preferenceRowStyles = css({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
});

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

  const t = await getTranslations("profile");

  const genderItems = [
    { label: t("gender.male"), value: "male" },
    { label: t("gender.female"), value: "female" },
    { label: t("gender.other"), value: "other" },
  ];

  const today = new Date().toISOString().slice(0, 10);
  const { dateOfBirth, gender, height } = session.user;

  async function updateProfile(formData: FormData) {
    "use server";

    const parsed = profileSchema.safeParse({
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      height: formData.get("height"),
    });

    if (!parsed.success) {
      redirect("/profile");
    }

    await auth.api.updateUser({
      headers: await headers(),
      body: parsed.data,
    });

    redirect("/");
  }

  return (
    <PageContainer width="narrow">
      <PageHeader title={t("title")} description={t("description")} />

      <div
        className={css({ display: "flex", flexDirection: "column", gap: "6" })}
      >
        <section className={cardStyles}>
          <div>
            <h2 className={sectionTitleStyles}>{t("personal.title")}</h2>
            <p className={sectionDescriptionStyles}>
              {t("personal.description")}
            </p>
          </div>

          <form
            action={updateProfile}
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
              defaultValue={
                dateOfBirth
                  ? new Date(dateOfBirth).toISOString().slice(0, 10)
                  : undefined
              }
              label={t("date-of-birth.label")}
              placeholder={t("date-of-birth.placeholder")}
            />

            <Select
              required
              name="gender"
              label={t("gender.label")}
              items={genderItems}
              defaultValue={gender ? [gender] : undefined}
              placeholder={t("gender.placeholder")}
            />

            <NumberInput
              required
              name="height"
              min={50}
              max={300}
              defaultValue={height != null ? String(height) : undefined}
              label={t("height.label")}
              placeholder={t("height.placeholder")}
            />

            <Button
              type="submit"
              size="lg"
              className={css({ alignSelf: "end", mt: "1" })}
            >
              {t("save")}
            </Button>
          </form>
        </section>

        <section className={cardStyles}>
          <div>
            <h2 className={sectionTitleStyles}>{t("preferences.title")}</h2>
            <p className={sectionDescriptionStyles}>
              {t("preferences.description")}
            </p>
          </div>

          <div className={preferenceRowStyles}>
            <span className={css({ color: "fg.default", textStyle: "sm" })}>
              {t("preferences.theme")}
            </span>
            <ThemeSwitcher />
          </div>

          <div className={preferenceRowStyles}>
            <span className={css({ color: "fg.default", textStyle: "sm" })}>
              {t("preferences.language")}
            </span>
            <LocaleSwitcher className={css({ w: "40" })} />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
