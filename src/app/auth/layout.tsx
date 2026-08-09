import { PulseLogo } from "@/components/pulse-logo";
import { css } from "@/styled-system/css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          w: "full",
        })}
      >
        <PulseLogo className={css({ alignSelf: "center", boxSize: "14" })} />
        {children}
      </div>
    </main>
  );
}
