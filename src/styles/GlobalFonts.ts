// src/styles/globalFonts.ts
import { createGlobalStyle } from 'styled-components';
import AddingtonItalic from '../assets/fonts/Addington-CF/Addington.CF/AddingtonCF-RegularItalic.otf';
import AddingtonRegular from '../assets/fonts/Addington-CF/Addington.CF/AddingtonCF-Regular.otf';

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Addington CF';
    src: url(${AddingtonRegular}) format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Addington CF';
    src: url(${AddingtonItalic}) format('opentype');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }
`;
