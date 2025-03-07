import React from 'react';
import { StyledLink } from './link.style';

interface LinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ 
  children, 
  onClick,
  href,
  className
}) => {
  return (
    <StyledLink 
      onClick={onClick}
      href={href}
      className={className}
      as={onClick && !href ? 'button' : 'a'}
    >
      {children}
    </StyledLink>
  );
};

export default Link;