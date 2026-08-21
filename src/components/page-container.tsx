import { css } from "@/styled-system/css";

const widthStyles = {
  /** Reading/input pages: forms, settings */
  narrow: css({ maxW: "2xl", mx: "auto", w: "full" }),
  /** Data-dense pages: tables, dashboards */
  wide: css({ w: "full" }),
};

export interface PageContainerProps {
  width?: keyof typeof widthStyles;
  children: React.ReactNode;
}

export function PageContainer({
  width = "wide",
  children,
}: PageContainerProps) {
  return <div className={widthStyles[width]}>{children}</div>;
}
