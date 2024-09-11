import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaArrowRight } from 'react-icons/fa';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { languageOptions } from '@/constants/languages';
import { LanguageOptionsStrings } from '@/types/types';

type Props = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageOptionsStrings>>;
};
function SideBar({ language, setLanguage }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  const getLanguage = (rawLanguage: string) => {
    const newLang = languageOptions.find((lang) => lang.lang === rawLanguage);
    if (newLang) {
      setLanguage(newLang.lang);
    }
  };

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="#0a0a0a"
      rootStyles={{ borderColor: '#262626', position: 'relative' }}
      width="170px"
      collapsedWidth="60px"
      className="font-play"
    >
      <Menu
        rootStyles={{
          padding: 6,
        }}
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0) {
              return {
                color: disabled ? '#f5d9ff' : '#e5e5e5',
                backgroundColor: active ? '#0891b2' : undefined,
                paddingLeft: 7,
                borderRadius: 6,
                marginBottom: 4,
                fontSize: 14,
                '&:hover': { backgroundColor: active ? '#0891b2' : '#404040' },
              };
            }
            return {};
          },
        }}
      >
        {languageOptions.map((lang) => {
          if (collapsed) {
            return (
              <Tooltip key={lang.lang}>
                <TooltipTrigger asChild>
                  <MenuItem
                    onClick={() => getLanguage(lang.lang)}
                    active={language === lang.lang}
                    icon={<lang.icon size={26} className="mx-auto" />}
                  >
                    {lang.formattedName}
                  </MenuItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{lang.formattedName}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
          return (
            <MenuItem
              key={lang.lang}
              onClick={() => getLanguage(lang.lang)}
              active={language === lang.lang}
              icon={<lang.icon size={26} className="mx-auto" />}
            >
              {lang.formattedName}
            </MenuItem>
          );
        })}
      </Menu>
      <Button
        onClick={() => setCollapsed((prev) => !prev)}
        variant="ghost"
        className="ml-2 absolute bottom-2 left-[-1px]"
      >
        <FaArrowRight
          className={`text-neutral-300 transition-all duration-500 ease-out ${collapsed ? '' : 'rotate-180'}`}
        />
      </Button>
    </Sidebar>
  );
}

export default SideBar;
