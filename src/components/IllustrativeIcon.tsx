import React from 'react';
interface IllustrativeIconProps extends React.SVGProps<SVGSVGElement> {
  name: 'magic-wand' | 'document';
}
export function IllustrativeIcon({ name, ...props }: IllustrativeIconProps) {
  switch (name) {
    case 'magic-wand':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M15 4V2" />
          <path d="M15 10V8" />
          <path d="M12.3 7.7 11 9" />
          <path d="M5 4v2" />
          <path d="M5 10v2" />
          <path d="M7.7 7.7 9 9" />
          <path d="m15 12.3-1.3-1.3" />
          <path d="M2 5h2" />
          <path d="M8 5h2" />
          <path d="m7.7 12.3-1.3 1.3" />
          <path d="M19 13c-1.5-1.5-3-1.5-3-3 0-1.5 1.5-3 3-3s3 1.5 3 3c0 1.5-1.5 1.5-3 3Z" />
          <path d="M3 21 12 12" />
        </svg>
      );
    case 'document':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      );
    default:
      return null;
  }
}