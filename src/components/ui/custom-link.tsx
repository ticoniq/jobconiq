import Link from 'next/link';
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const linkVariants = cva(
  'inline-block leading-loose group transition-all duration-500',
  {
    variants: {
      variant: {
        default: 'text-neutrals-300',
        underline: 'underline-offset-4 hover:underline',
        subtle: 'text-muted-foreground hover:text-foreground',
      },
      size: {
        default: 'text-base',
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  textarea: string;
  divClassName?: string;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, href, textarea, divClassName, ...props }, ref) => {
    return (
      <Link
        href={href}
        className={cn(linkVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {textarea}
        <span className={cn("block bg-white h-[1.5px] w-0 group-hover:w-full transition-all duration-500", divClassName)}></span>
      </Link>
    );
  }
);

CustomLink.displayName = 'CustomLink';

export default CustomLink;
