import { Input, InputProps, InputStylesNames } from "@mantine/core";
import clsx from "clsx";
import React, { FC, HtmlHTMLAttributes, InputHTMLAttributes } from "react";

export type IBaseInputProps = InputProps &
  InputHTMLAttributes<HTMLInputElement> & {
    classNames?: Partial<Record<InputStylesNames, string>> | undefined;
  };

const BaseInput: FC<IBaseInputProps> = (props) => {
  const { classNames, ...other } = props;
  return (
    <Input
      classNames={{
        ...classNames,
        input: clsx("!h-12 !rounded-xl", classNames?.input),
      }}
      {...other}
    />
  );
};

export default BaseInput;
