import React from 'react';

interface LupaIconProps extends React.SVGProps<SVGSVGElement> {
  /** Lado do ícone (px ou qualquer unidade CSS). Padrão: 16 px */
  size?: number | string;
}

/**
 * Ícone de Lupa (search) em SVG – usa `currentColor` no fill
 * para herdar a cor via CSS/styled-components.
 */
const LupaIcon: React.FC<LupaIconProps> = ({ size = 16, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    {/* Caminho baseado no Bootstrap “search” (licença MIT) */}
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85ZM12.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

export default LupaIcon;
