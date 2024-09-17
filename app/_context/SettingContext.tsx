import { createContext, useContext, useMemo, useState } from 'react';

import {
  CursorStyle,
  TabCompletion,
  TabSize,
  CursorBlinking,
  FontWeight,
  MatchBrackets,
  AutoCloseBrackets,
  AutoCloseQuotes,
  AutoIndent,
} from '@/types/types';

type Settings = {
  cursorStyle: CursorStyle;
  cursorBlinking: CursorBlinking;
  tabCompletion: TabCompletion;
  tabSize: TabSize;
  fixedOverflowWidgets?: boolean;
  fontSize: number;
  folding: boolean;
  fontWeight: FontWeight;
  matchBrackets: MatchBrackets;
  autoCloseBrackets: AutoCloseBrackets;
  autoClosingQuotes: AutoCloseQuotes;
  autoIndent: AutoIndent;
  miniMapEnabled: boolean;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const SettingsContext = createContext<SettingsContextType>({
  settings: {
    cursorStyle: 'line',
    cursorBlinking: 'blink',
    tabCompletion: 'on',
    tabSize: '2',
    fixedOverflowWidgets: true,
    fontSize: 14,
    folding: true,
    fontWeight: '100',
    matchBrackets: 'always',
    autoCloseBrackets: 'always',
    autoClosingQuotes: 'always',
    autoIndent: 'advanced',
    miniMapEnabled: true,
  },
  setSettings: () => {},
});

type Props = {
  children: React.ReactNode;
};

function SettingsContextProvider({ children }: Props) {
  const [settings, setSettings] = useState<Settings>({
    cursorStyle: 'line',
    cursorBlinking: 'blink',
    tabCompletion: 'on',
    tabSize: '2',
    fontSize: 14,
    folding: true,
    fontWeight: '100',
    matchBrackets: 'always',
    autoCloseBrackets: 'always',
    autoClosingQuotes: 'always',
    autoIndent: 'advanced',
    miniMapEnabled: true,
  });

  const value = useMemo(() => ({ settings, setSettings }), [settings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export default SettingsContextProvider;

export const useSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  return { settings, setSettings };
};
