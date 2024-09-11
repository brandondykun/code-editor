import { useEffect } from 'react';
import { toast } from 'sonner';
import { Editor, useMonaco } from '@monaco-editor/react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { RiCodeSSlashFill } from 'react-icons/ri';
import { FaPlay } from 'react-icons/fa';

import { useSettings } from '@/app/_context/SettingContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import executeCode from '@/api/api';
import { LanguageState } from '@/types/types';

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  languageState: LanguageState;
  setLanguageState: React.Dispatch<React.SetStateAction<LanguageState>>;
  selectedLanguage: string;
};
function CodeEditor({ loading, setLoading, languageState, setLanguageState, selectedLanguage }: Props) {
  const { settings } = useSettings();

  // const inputFile = useRef<HTMLInputElement | null>(null);
  const monaco = useMonaco();

  // grab the current code from the language state by using the selected language as the key
  const { code } = languageState[selectedLanguage];

  useEffect(() => {
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    if (monaco) {
      monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#171717', // editor background color
        },
      });

      monaco.editor.setTheme('customTheme');
    }
  }, [monaco]);

  // handle code changes in the editor
  const handleEditorChange = (value: string | undefined) => {
    setLanguageState((prev) => {
      const newState = { ...prev, [selectedLanguage]: { ...prev[selectedLanguage], code: value || '' } };
      return newState;
    });
  };

  // handle copy button click
  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast(
        <div className="flex flex-row items-center gap-6">
          <IoIosCheckmarkCircleOutline size={24} className="text-lime-500" />
          <span className="text-md">Editor contents copied to clipboard</span>
        </div>,
      );
    }
  };

  // handle clear button click
  const handleClearEditor = () => {
    setLanguageState((prev) => ({ ...prev, [selectedLanguage]: { ...prev[selectedLanguage], code: '' } }));
  };

  // handle run button click
  const submitCode = async () => {
    if (code) {
      setLanguageState((prev) => ({
        ...prev,
        [selectedLanguage]: { ...prev[selectedLanguage], hasError: false, output: '' },
      }));

      setLoading(true);
      const res = await executeCode(code, { lang: selectedLanguage, version: languageState[selectedLanguage].version });

      if (res.status === 200) {
        if (res.data.run.stderr) {
          setLanguageState((prev) => ({
            ...prev,
            [selectedLanguage]: { ...prev[selectedLanguage], hasError: true, output: res.data.run.stderr },
          }));
        } else {
          setLanguageState((prev) => ({
            ...prev,
            [selectedLanguage]: { ...prev[selectedLanguage], output: res.data.run.output },
          }));
        }
      }
      setLoading(false);
    }
  };

  // handle upload file button click
  // const onUploadFileClick = () => {
  //   // `current` points to the mounted file input element
  //   if (inputFile && inputFile?.current) {
  //     inputFile?.current.click();
  //   }
  // };

  // const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event?.target?.files) {
  //     event.stopPropagation();
  //     event.preventDefault();

  //     const file = event.target.files[0];
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       if (e.target) {
  //         const file = e.target.result;
  //         console.log(file);
  //         setCode(file as string);
  //       }
  //     };

  //     reader.onerror = (e) => {
  //       if (e?.target?.error) {
  //         alert(e.target.error.name);
  //       }
  //     };
  //     reader.readAsText(file);
  //   }
  // };

  return (
    <>
      <div className="flex flex-col flex-1 relative overflow-visible">
        <Editor
          className="absolute top-0 right-0 bottom-0 left-0 overflow-visible"
          language={selectedLanguage}
          onChange={handleEditorChange}
          theme="vs-dark"
          value={code}
          loading={
            <div className="animate-pulse text-neutral-400 flex flex-row items-center gap-2">
              <RiCodeSSlashFill size={24} className="text-neutral-700" />
              <div className="font-play">Initializing Editor...</div>
            </div>
          }
          options={{
            padding: { bottom: 4, top: 4 },
            cursorStyle: settings.cursorStyle,
            cursorBlinking: settings.cursorBlinking,
            tabSize: Number(settings.tabSize),
            tabCompletion: settings.tabCompletion,
            fixedOverflowWidgets: true,
            fontSize: settings.fontSize,
            dragAndDrop: true,
            folding: settings.folding,
            fontWeight: settings.fontWeight,
          }}
        />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Button onClick={submitCode} disabled={loading || !code} className="gap-2 h-9 font-play">
          <FaPlay size={12} className="text-cyan-700" />
          <div>Run</div>
        </Button>
        <div className="flex flex-row gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" onClick={handleClearEditor} className="h-9 font-play" disabled={!code}>
                Clear
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all code from editor</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="h-9 font-play" onClick={copyToClipboard} disabled={!code}>
                Copy
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy editor contents to clipboard</p>
            </TooltipContent>
          </Tooltip>

          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={onUploadFileClick} className="h-9">
                  <FaFileAlt />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open file in editor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          {/* <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={onChangeFile}
            accept=".py,.js,.ts"
          /> */}
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
