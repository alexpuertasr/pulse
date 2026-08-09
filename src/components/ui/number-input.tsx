"use client";

import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cx } from "@/styled-system/css";
import {
  type NumberInputVariantProps,
  numberInput,
} from "@/styled-system/recipes";

export interface NumberInputProps
  extends ArkNumberInput.RootProps,
    NumberInputVariantProps {
  required?: boolean;
  label?: string;
  placeholder?: string;
}

export function NumberInput({
  size,
  label,
  placeholder,
  required,
  className,
  ...rest
}: NumberInputProps) {
  const classes = numberInput({ size });

  return (
    <ArkNumberInput.Root {...rest} className={cx(classes.root, className)}>
      {label && (
        <ArkNumberInput.Label className={classes.label}>
          {label}
        </ArkNumberInput.Label>
      )}
      <ArkNumberInput.Control className={classes.control}>
        <ArkNumberInput.Input
          className={classes.input}
          placeholder={placeholder}
          required={required}
        />
        <ArkNumberInput.IncrementTrigger className={classes.incrementTrigger}>
          <ChevronUpIcon size={14} />
        </ArkNumberInput.IncrementTrigger>
        <ArkNumberInput.DecrementTrigger className={classes.decrementTrigger}>
          <ChevronDownIcon size={14} />
        </ArkNumberInput.DecrementTrigger>
      </ArkNumberInput.Control>
    </ArkNumberInput.Root>
  );
}
