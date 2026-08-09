import { css } from "@/styled-system/css";

interface AuthHeadingProps {
  title: string;
  description: string;
}

export function AuthHeading({ title, description }: AuthHeadingProps) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1.5",
        textAlign: "center",
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
