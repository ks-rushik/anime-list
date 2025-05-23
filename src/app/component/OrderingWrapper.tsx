import React, { FC, ReactNode } from "react";

export type IOrderingWrapperProps = {
  title: string | undefined;
  children: ReactNode;
};

const OrderingWrapper: FC<IOrderingWrapperProps> = (props) => {
  const { title, children } = props;
  return (
    <div className="flex flex-row items-center gap-1">
      {title}
      {children}
    </div>
  );
};

export default OrderingWrapper;
