"use client";

import {
  DatePicker as ArkDatePicker,
  parseDate,
} from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cx } from "@/styled-system/css";
import {
  type DatePickerVariantProps,
  datePicker,
} from "@/styled-system/recipes";

export interface DatePickerProps
  extends Omit<ArkDatePicker.RootProps, "format" | "parse" | "min" | "max">,
    DatePickerVariantProps {
  required?: boolean;
  label?: string;
  placeholder?: string;
  /** ISO date string, e.g. "1900-01-01" */
  min?: string;
  /** ISO date string, e.g. "2026-08-09" */
  max?: string;
}

function safeParseDate(value: string) {
  try {
    return parseDate(value);
  } catch {
    return undefined;
  }
}

export function DatePicker({
  required,
  size,
  label,
  placeholder,
  min,
  max,
  className,
  ...rest
}: DatePickerProps) {
  const classes = datePicker({ size });

  return (
    <ArkDatePicker.Root
      {...rest}
      className={cx(classes.root, className)}
      format={(date) => date.toString()}
      parse={safeParseDate}
      min={min ? safeParseDate(min) : undefined}
      max={max ? safeParseDate(max) : undefined}
    >
      {label && (
        <ArkDatePicker.Label className={classes.label}>
          {label}
        </ArkDatePicker.Label>
      )}
      <ArkDatePicker.Control className={classes.control}>
        <ArkDatePicker.Input
          required={required}
          className={classes.input}
          placeholder={placeholder}
        />
        <ArkDatePicker.Trigger className={classes.trigger}>
          <CalendarIcon size={16} />
        </ArkDatePicker.Trigger>
      </ArkDatePicker.Control>
      <Portal>
        <ArkDatePicker.Positioner className={classes.positioner}>
          <ArkDatePicker.Content className={classes.content}>
            <ArkDatePicker.View view="day" className={classes.view}>
              <ArkDatePicker.Context>
                {(api) => (
                  <>
                    <ViewControl classes={classes} />
                    <ArkDatePicker.Table className={classes.table}>
                      <ArkDatePicker.TableHead>
                        <ArkDatePicker.TableRow>
                          {api.weekDays.map((weekDay) => (
                            <ArkDatePicker.TableHeader
                              key={weekDay.long}
                              className={classes.tableHeader}
                            >
                              {weekDay.narrow}
                            </ArkDatePicker.TableHeader>
                          ))}
                        </ArkDatePicker.TableRow>
                      </ArkDatePicker.TableHead>
                      <ArkDatePicker.TableBody>
                        {api.weeks.map((week) => (
                          <ArkDatePicker.TableRow key={week[0]?.toString()}>
                            {week.map((day) => (
                              <ArkDatePicker.TableCell
                                key={day.toString()}
                                className={classes.tableCell}
                                value={day}
                              >
                                <ArkDatePicker.TableCellTrigger
                                  className={classes.tableCellTrigger}
                                >
                                  {day.day}
                                </ArkDatePicker.TableCellTrigger>
                              </ArkDatePicker.TableCell>
                            ))}
                          </ArkDatePicker.TableRow>
                        ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
            <ArkDatePicker.View view="month" className={classes.view}>
              <ArkDatePicker.Context>
                {(api) => (
                  <>
                    <ViewControl classes={classes} />
                    <ArkDatePicker.Table className={classes.table}>
                      <ArkDatePicker.TableBody>
                        {api
                          .getMonthsGrid({ columns: 4, format: "short" })
                          .map((months) => (
                            <ArkDatePicker.TableRow key={months[0]?.label}>
                              {months.map((month) => (
                                <ArkDatePicker.TableCell
                                  key={month.label}
                                  className={classes.tableCell}
                                  value={month.value}
                                >
                                  <ArkDatePicker.TableCellTrigger
                                    className={classes.tableCellTrigger}
                                  >
                                    {month.label}
                                  </ArkDatePicker.TableCellTrigger>
                                </ArkDatePicker.TableCell>
                              ))}
                            </ArkDatePicker.TableRow>
                          ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
            <ArkDatePicker.View view="year" className={classes.view}>
              <ArkDatePicker.Context>
                {(api) => (
                  <>
                    <ViewControl classes={classes} />
                    <ArkDatePicker.Table className={classes.table}>
                      <ArkDatePicker.TableBody>
                        {api.getYearsGrid({ columns: 4 }).map((years) => (
                          <ArkDatePicker.TableRow key={years[0]?.label}>
                            {years.map((year) => (
                              <ArkDatePicker.TableCell
                                key={year.label}
                                className={classes.tableCell}
                                value={year.value}
                              >
                                <ArkDatePicker.TableCellTrigger
                                  className={classes.tableCellTrigger}
                                >
                                  {year.label}
                                </ArkDatePicker.TableCellTrigger>
                              </ArkDatePicker.TableCell>
                            ))}
                          </ArkDatePicker.TableRow>
                        ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
          </ArkDatePicker.Content>
        </ArkDatePicker.Positioner>
      </Portal>
    </ArkDatePicker.Root>
  );
}

function ViewControl({ classes }: { classes: ReturnType<typeof datePicker> }) {
  return (
    <ArkDatePicker.ViewControl className={classes.viewControl}>
      <ArkDatePicker.PrevTrigger className={classes.prevTrigger}>
        <ChevronLeftIcon size={16} />
      </ArkDatePicker.PrevTrigger>
      <ArkDatePicker.ViewTrigger className={classes.viewTrigger}>
        <ArkDatePicker.RangeText className={classes.rangeText} />
      </ArkDatePicker.ViewTrigger>
      <ArkDatePicker.NextTrigger className={classes.nextTrigger}>
        <ChevronRightIcon size={16} />
      </ArkDatePicker.NextTrigger>
    </ArkDatePicker.ViewControl>
  );
}
