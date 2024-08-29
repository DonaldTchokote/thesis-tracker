import { Callout } from "@radix-ui/themes";
import React from "react";

interface Props {
  className: string;
  children: string;
}
const ErrorDialog = ({ className, children }: Props) => {
  if (!children) return null;

  return (
    <div>
      <Callout.Root color="red" className={className}>
        {children}
        <Callout.Text></Callout.Text>
      </Callout.Root>
    </div>
  );
};

export default ErrorDialog;
