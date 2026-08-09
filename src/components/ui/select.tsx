"use client";

import { Portal } from "@ark-ui/react/portal";
import {
  Select as ArkSelect,
  createListCollection,
} from "@ark-ui/react/select";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useMemo } from "react";

import { cx } from "@/styled-system/css";
import { type SelectVariantProps, select } from "@/styled-system/recipes";

export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<ArkSelect.RootProps<SelectItem>, "collection">,
    SelectVariantProps {
  items: SelectItem[];
  label?: string;
  placeholder?: string;
}

export function Select({
  size,
  items,
  label,
  placeholder,
  className,
  ...rest
}: SelectProps) {
  const collection = useMemo(() => createListCollection({ items }), [items]);
  const classes = select({ size });

  return (
    <ArkSelect.Root
      {...rest}
      collection={collection}
      className={cx(classes.root, className)}
    >
      {label && (
        <ArkSelect.Label className={classes.label}>{label}</ArkSelect.Label>
      )}
      <ArkSelect.Control className={classes.control}>
        <ArkSelect.Trigger className={classes.trigger}>
          <ArkSelect.ValueText
            className={classes.valueText}
            placeholder={placeholder}
          />
          <ArkSelect.Indicator className={classes.indicator}>
            <ChevronsUpDownIcon size={16} />
          </ArkSelect.Indicator>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      <Portal>
        <ArkSelect.Positioner className={classes.positioner}>
          <ArkSelect.Content className={classes.content}>
            {items.map((item) => (
              <ArkSelect.Item
                key={item.value}
                className={classes.item}
                item={item}
              >
                <ArkSelect.ItemText className={classes.itemText}>
                  {item.label}
                </ArkSelect.ItemText>
                <ArkSelect.ItemIndicator className={classes.itemIndicator}>
                  <CheckIcon size={16} />
                </ArkSelect.ItemIndicator>
              </ArkSelect.Item>
            ))}
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
      <ArkSelect.HiddenSelect />
    </ArkSelect.Root>
  );
}
