import { Button, type ButtonProps } from "@/components/ui/button";
import { css, cx } from "@/styled-system/css";

export interface IconButtonProps extends ButtonProps {
  "aria-label": string;
}

export function IconButton({ className, ...props }: IconButtonProps) {
  return <Button className={cx(css({ px: "0" }), className)} {...props} />;
}
