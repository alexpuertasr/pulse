import { css } from "@/styled-system/css";

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1",
        mb: "8",
      })}
    >
      <h1
        className={css({
          color: "fg.default",
          fontWeight: "bold",
          textStyle: "2xl",
        })}
      >
        {title}
      </h1>
      <p className={css({ color: "fg.muted", textStyle: "sm" })}>
        {description}
      </p>
    </div>
  );
}
