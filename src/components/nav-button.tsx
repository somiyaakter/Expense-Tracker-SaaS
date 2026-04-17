import React from 'react'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
    href: string;
    label: string;
    isActive?: boolean;
}

export default function NavButton({href,label,isActive}: Props) {
  return (
      <Button asChild size="sm" variant="outline" className={ cn("w-full lg:w-auto justify-between font-normal hover:bg-accent  border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",isActive ?"bg-white/30":"bg-transparent")} >
          <Link href={href}>{label}</Link>
    </Button>
  )
}
