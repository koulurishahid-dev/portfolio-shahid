import React from 'react';

interface LiveProjectButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
  label?: string;
  icon?: React.ReactNode;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  className = '',
  onClick,
  href,
  label = 'LIVE PROJECT',
  icon,
}) => {
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 font-medium uppercase tracking-widest text-[#D7E2EA] text-xs sm:text-sm">
      <span>{label}</span>
      {icon}
    </span>
  );

  const baseClasses = `inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-6 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-95 cursor-pointer select-none ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};
