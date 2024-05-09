import React, { forwardRef } from "react";
import RcRate from "rc-rate";
import type { RateProps as RcRateProps } from "rc-rate/lib/Rate";
import type { StarProps as RcStarProps } from "rc-rate/lib/Star";
import { StarIcon } from "@heroicons/react/24/outline";
import { cn, FieldError, FieldHelperText, Tooltip } from "rizzui";

const labelStyles = {
  size: {
    sm: "text-xs mb-1",
    md: "text-sm mb-1.5",
    lg: "text-sm mb-1.5",
    xl: "text-base mb-2",
  },
};

const rateStyles = {
  base: "flex items-center [&>li]:cursor-pointer [&.rc-rate-disabled>li]:cursor-default [&>li]:relative [&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li]:inline-block text-muted",
  size: {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
    xl: "h-8 w-8",
  },
  firstStar:
    "[&>li>div>.rc-rate-star-first]:absolute [&>li>div>.rc-rate-star-first]:left-0 rtl:[&>li>div>.rc-rate-star-first]:right-0 [&>li>div>.rc-rate-star-first]:top-0 [&>li>div>.rc-rate-star-first]:w-1/2 [&>li>div>.rc-rate-star-first]:h-full [&>li>div>.rc-rate-star-first]:overflow-hidden",
  color:
    "[&>.rc-rate-star-half>div>.rc-rate-star-first]:text-orange [&>.rc-rate-star-full>div]:text-orange",
  transition:
    "[&>li>div]:transition-all [&>li>div]:duration-300 [&>.rc-rate-star:hover]:scale-110",
};

export interface RateProps
  extends Omit<RcRateProps, "character" | "className"> {
  label?: React.ReactNode;
  size?: keyof typeof rateStyles.size;
  character?: React.ReactNode | Array<React.ReactNode>;
  characterClassName?: string;
  tooltips?: Array<string>;
  helperText?: React.ReactNode;
  error?: string;
  labelClassName?: string;
  rateClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  className?: string;
}

const Rate = forwardRef<any, RateProps>(
  (
    {
      size = "md",
      disabled = false,
      character = <StarIcon />,
      label,
      tooltips,
      error,
      helperText,
      labelClassName,
      characterClassName,
      errorClassName,
      helperClassName,
      rateClassName,
      className,
      ...props
    },
    ref
  ) => {
    const characterRender = (
      node: React.ReactElement,
      { index }: RcStarProps
    ) => {
      if (!tooltips) {
        return node;
      }

      return (
        <Tooltip content={tooltips[index as number]} placement="top">
          {node}
        </Tooltip>
      );
    };

    return (
      <div className={cn("aegon-rate", className)}>
        {label && (
          <div
            className={cn(
              "block font-medium",
              labelStyles.size[size],
              labelClassName
            )}
          >
            {label}
          </div>
        )}

        <RcRate
          ref={ref}
          
          disabled={disabled}
          characterRender={characterRender}
          character={({ index }: RcStarProps) => (
            <div
              className={cn(
                "[&>svg]:fill-current",
                rateStyles.size[size],
                characterClassName
              )}
            >
              {Array.isArray(character)
                ? character[index as number]
                : character}
            </div>
          )}
          className={cn(
            rateStyles.base,
            rateStyles.firstStar,
            rateStyles.color,
            !disabled && rateStyles.transition,
            rateClassName
          )}
          {...props}
        />

        {!error && helperText && (
          <FieldHelperText size={size} className={helperClassName}>
            {helperText}
          </FieldHelperText>
        )}

        {error && (
          <FieldError size={size} error={error} className={errorClassName} />
        )}
      </div>
    );
  }
);

Rate.displayName = "Rate";

export default Rate;