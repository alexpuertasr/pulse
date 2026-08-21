import { desc, eq } from "drizzle-orm";
import { RulerIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";

import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { db } from "@/db";
import { bodyMeasurements } from "@/db/schema/body-measurements";
import { auth } from "@/lib/auth";
import { css } from "@/styled-system/css";

const columns = [
  "neck",
  "shoulders",
  "chest",
  "waist",
  "hips",
  "biceps",
  "thigh",
  "calf",
] as const;

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const t = await getTranslations("measurements");
  const format = await getFormatter();

  const measurements = await db
    .select()
    .from(bodyMeasurements)
    .where(eq(bodyMeasurements.userId, session.user.id))
    .orderBy(desc(bodyMeasurements.date));

  return (
    <PageContainer width="wide">
      <PageHeader title={t("title")} description={t("description")} />

      {measurements.length === 0 ? (
        <div
          className={css({
            alignItems: "center",
            bg: "bg.default",
            borderColor: "border.subtle",
            borderRadius: "xl",
            borderWidth: "1px",
            display: "flex",
            flexDirection: "column",
            gap: "3",
            px: "6",
            py: "16",
            textAlign: "center",
          })}
        >
          <RulerIcon className={css({ boxSize: "8", color: "fg.subtle" })} />
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "1",
            })}
          >
            <p
              className={css({
                color: "fg.default",
                fontWeight: "semibold",
                textStyle: "md",
              })}
            >
              {t("empty.title")}
            </p>
            <p className={css({ color: "fg.muted", textStyle: "sm" })}>
              {t("empty.description")}
            </p>
          </div>
        </div>
      ) : (
        <div
          className={css({
            bg: "bg.default",
            borderColor: "border.subtle",
            borderRadius: "xl",
            borderWidth: "1px",
            overflowX: "auto",
          })}
        >
          <table
            className={css({
              borderCollapse: "collapse",
              textAlign: "start",
              w: "full",
            })}
          >
            <thead>
              <tr
                className={css({
                  borderBottomWidth: "1px",
                  borderColor: "border.subtle",
                })}
              >
                <th className={headerCellStyles}>{t("table.date")}</th>
                {columns.map((column) => (
                  <th key={column} className={headerCellStyles}>
                    {t(`table.${column}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {measurements.map((measurement) => (
                <tr
                  key={measurement.id}
                  className={css({
                    borderBottomWidth: "1px",
                    borderColor: "border.subtle",
                    _last: { borderBottomWidth: "0" },
                  })}
                >
                  <td
                    className={css({
                      color: "fg.default",
                      px: "4",
                      py: "3",
                      textStyle: "sm",
                      whiteSpace: "nowrap",
                    })}
                  >
                    {format.dateTime(measurement.date, {
                      dateStyle: "medium",
                    })}
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column}
                      className={css({
                        color: "fg.default",
                        fontFamily: "mono",
                        px: "4",
                        py: "3",
                        textStyle: "sm",
                      })}
                    >
                      {measurement[column] ?? (
                        <span className={css({ color: "fg.subtle" })}>—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}

const headerCellStyles = css({
  color: "fg.muted",
  fontWeight: "medium",
  px: "4",
  py: "3",
  textAlign: "start",
  textStyle: "xs",
  whiteSpace: "nowrap",
});
