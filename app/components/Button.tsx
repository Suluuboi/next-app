// Button.tsx
"use client"; // This ensures the component is client-side

import React from "react";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

interface Props extends ButtonProps {
  children: string;
}

export default function Button({
  children,
  onClick,
  className,
  ...rest
}: Props) {
  return (
    <button className={`btn ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
