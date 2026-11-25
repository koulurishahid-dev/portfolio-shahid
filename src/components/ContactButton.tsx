import React from 'react';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  onClick,
  href = '#contact',
  label = 'LET\'S CONNECT',
  type = 'button',
}) => {
  const content = (
    <span className="relative z-10 flex items-center justify-center font-kanit font-semibold uppercase tracking-wider text-white text-xs sm:text-sm">
      {label}
    </span>
  );

  const baseClasses = `group relative inline-flex items-center justify-center h-[48px] sm:h-[52px] px-7 sm:px-9 rounded-full bg-gradient-to-r from-[#172554] via-[#1e1b4b] to-[#0f172a] hover:from-[#1e3a8a] hover:via-[#312e81] hover:to-[#0369a1] border border-sky-400/40 hover:border-sky-400/80 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] active:translate-y-0 active:scale-95 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={baseClasses} aria-label={label}>
        {content}
        <div className="absolute inset-0 rounded-full bg-sky-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses} aria-label={label}>
      {content}
      <div className="absolute inset-0 rounded-full bg-sky-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};
