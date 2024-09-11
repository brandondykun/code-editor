'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import SettingsContextProvider from './SettingContext';

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  return (
    <SettingsContextProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SettingsContextProvider>
  );
}

export default Providers;
