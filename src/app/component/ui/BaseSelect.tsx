import { Select, SelectProps, SelectStylesNames } from "@mantine/core";
import clsx from "clsx";
import React, { FC } from "react";

export type IBaseSelectProps = SelectProps & {
  classNames?: Partial<Record<SelectStylesNames, string>> | undefined;
};

const BaseSelect: FC<IBaseSelectProps> = (props) => {
  const { classNames, ...other } = props;
  return (
    <Select
      {...other}
      classNames={{
        ...classNames,
        root: clsx("relative", classNames?.root),
        input: clsx("!h-12 !rounded-xl", classNames?.input),
        label: clsx("absolute -top-3 left-3 z-10 bg-white px-1 text-sm font-thin text-gray-600", classNames?.label),
      }}
    />
  );
};

export default BaseSelect;
