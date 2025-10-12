'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

type FooterSectionProps = {
  title: string;
  links: { label: string; href: string }[];
};

export function FooterSection({ title, links }: FooterSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-700 lg:border-none text-black dark:text-neutral-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-7 lg:py-0 lg:cursor-default"
      >
        <h3 className="uppercase font-bold text-xs lg:text-sm tracking-tight
        lg:mb-4">{title}</h3>
        <ChevronDown
          className={`lg:hidden transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          size={16}
        />
      </button>

      <ul
        className={`overflow-hidden transition-[max-height] duration-300 lg:block space-y-1
          lg:mb-7 lg:w-4/5 ${
          open ? 'max-h-[900px] pb-6' : 'max-h-0'
        } lg:max-h-full`}
      >
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="group relative inline-block py-4 lg:py-1 uppercase 
              transition-all duration-400 tracking-wider text-xs lg:text-sm
              font-medium"
            >
              {label}
              <span className="absolute bottom-0 left-0 h-[1px] 
              w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}