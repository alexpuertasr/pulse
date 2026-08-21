import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";

import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { db } from "@/db";
import { bodyMeasurements } from "@/db/schema/body-measurements";
import { bodyWeights } from "@/db/schema/body-weights";
import { auth } from "@/lib/auth";
import { css } from "@/styled-system/css";

function getAge(dateOfBirth: Date) {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }

  return age;
}

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const { dateOfBirth, height } = session.user;

  if (dateOfBirth == null || height == null) {
    redirect("/auth/onboarding");
  }

  const t = await getTranslations("home");
  const format = await getFormatter();

  const [[latestWeight], [latestMeasurement]] = await Promise.all([
    db
      .select()
      .from(bodyWeights)
      .where(eq(bodyWeights.userId, session.user.id))
      .orderBy(desc(bodyWeights.date))
      .limit(1),
    db
      .select()
      .from(bodyMeasurements)
      .where(eq(bodyMeasurements.userId, session.user.id))
      .orderBy(desc(bodyMeasurements.date))
      .limit(1),
  ]);

  const stats = [
    {
      label: t("stats.age"),
      value: t("stats.years", { age: getAge(new Date(dateOfBirth)) }),
    },
    {
      label: t("stats.height"),
      value: `${height} cm`,
    },
    {
      label: t("stats.weight"),
      value: latestWeight ? `${latestWeight.weight} kg` : null,
      date: latestWeight?.date,
    },
    {
      label: t("stats.waist"),
      value: latestMeasurement ? `${latestMeasurement.waist} cm` : null,
      date: latestMeasurement?.date,
    },
  ];

  return (
    <PageContainer width="wide">
      <PageHeader
        title={t("title", { name: session.user.name.split(" ")[0] })}
        description={t("description")}
      />

      <div
        className={css({
          display: "grid",
          gap: "4",
          gridTemplateColumns: {
            base: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        })}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={css({
              bg: "bg.default",
              borderColor: "border.subtle",
              borderRadius: "xl",
              borderWidth: "1px",
              display: "flex",
              flexDirection: "column",
              gap: "1",
              p: "5",
            })}
          >
            <span className={css({ color: "fg.muted", textStyle: "sm" })}>
              {stat.label}
            </span>
            {stat.value ? (
              <span
                className={css({
                  color: "fg.default",
                  fontFamily: "mono",
                  fontWeight: "semibold",
                  textStyle: "2xl",
                })}
              >
                {stat.value}
              </span>
            ) : (
              <span
                className={css({
                  color: "fg.subtle",
                  fontWeight: "medium",
                  textStyle: "2xl",
                })}
              >
                {t("stats.no-data")}
              </span>
            )}
            {stat.date && (
              <span className={css({ color: "fg.subtle", textStyle: "xs" })}>
                {format.dateTime(stat.date, { dateStyle: "medium" })}
              </span>
            )}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
