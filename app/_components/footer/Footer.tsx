import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Language, LanguageOptionsStrings } from '@/types/types';
import { languageOptions } from '@/constants/languages';

type Props = {
  language: Language;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<LanguageOptionsStrings>>;
};

function Footer({ language, setSelectedLanguage }: Props) {
  const handleLanguageChange = (newLanguage: string) => {
    const lang = languageOptions.find((option) => option.lang === newLanguage);
    if (lang) {
      setSelectedLanguage(lang.lang);
    }
  };

  return (
    <div className="h-6 flex flex-row dark:bg-neutral-950 items-center px-4 border-t border-t-neutral-800 gap-4 font-play">
      <div className="text-xs text-neutral-400 hover:cursor-default">Editor Version 1.0</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="hover:no-underline text-xs h-[20px] text-cyan-500 py-0 px-2 hover:bg-neutral-800 rounded-none"
          >
            <span className="mr-1">{language.formattedName}</span>
            <span>{language.version}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]">
          <DropdownMenuRadioGroup value={language.lang} onValueChange={handleLanguageChange}>
            {languageOptions.map((lang) => (
              <DropdownMenuRadioItem
                value={lang.lang}
                className={`${language.lang === lang.lang ? 'text-cyan-500' : ''} font-play`}
                key={lang.lang}
              >
                {lang.formattedName}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Footer;
