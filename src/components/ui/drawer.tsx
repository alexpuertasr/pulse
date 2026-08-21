"use client";

import { Drawer as ArkDrawer } from "@ark-ui/react/drawer";
import { Portal } from "@ark-ui/react/portal";

import { cx } from "@/styled-system/css";
import { type DrawerVariantProps, drawer } from "@/styled-system/recipes";

export interface DrawerProps extends ArkDrawer.RootProps, DrawerVariantProps {
  /** Accessible name for the drawer panel */
  label: string;
  className?: string;
}

export function Drawer({
  label,
  size,
  className,
  children,
  ...rest
}: DrawerProps) {
  const classes = drawer({ size });

  return (
    <ArkDrawer.Root {...rest}>
      <Portal>
        <ArkDrawer.Backdrop className={classes.backdrop} />
        <ArkDrawer.Positioner className={classes.positioner}>
          <ArkDrawer.Content
            aria-label={label}
            className={cx(classes.content, className)}
          >
            {children}
          </ArkDrawer.Content>
        </ArkDrawer.Positioner>
      </Portal>
    </ArkDrawer.Root>
  );
}

export const DrawerCloseTrigger = ArkDrawer.CloseTrigger;
