import { IconType } from 'react-icons/lib';

// Settings Types

export type CursorStyle = 'block' | 'line' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin' | undefined;
export type TabCompletion = 'on' | 'off' | 'onlySnippets' | undefined;
export type TabSize = string | undefined;
export type CursorBlinking = 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
export type FontWeight = '100' | '600';
export type MatchBrackets = 'always' | 'never';
export type AutoCloseBrackets = 'always' | 'never';

// Language State Types

export type Language = {
  lang: LanguageOptionsStrings;
  version: string;
  icon: IconType;
  formattedName: string;
  code: string;
  output: string;
  hasError: boolean;
};

export type LanguageState = {
  [key: string]: Language;
};

export type LanguageOptions = Language[];

export type LanguageOptionsStrings =
  | 'javascript'
  | 'typescript'
  | 'swift'
  | 'kotlin'
  | 'python'
  | 'go'
  | 'ruby'
  | 'rust';
