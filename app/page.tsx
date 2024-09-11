'use client';

import { useState } from 'react';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { LanguageState, LanguageOptionsStrings } from '@/types/types';
import { languageState as langState, languageOptions } from '@/constants/languages';
import SideBar from './_components/sidebar/Sidebar';
import CodeOutput from './_components/codeOutput/CodeOutput';
import Footer from './_components/footer/Footer';
import Header from './_components/header/Header';
import CodeEditor from './_components/codeEditor/CodeEditor';

export default function Home() {
  const [loading, setLoading] = useState(false);

  // object with keys of each language. Keeps track of all code, outputs,
  // and errors for each language. This is the source of truth state.
  const [languageState, setLanguageState] = useState<LanguageState>(langState);
  // determines which language is currently selected. This is used as the key to access
  // the language state information for the selected language.
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOptionsStrings>(languageOptions[0].lang);

  return (
    <main className="flex min-h-screen flex-col bg-neutral-200 dark:bg-neutral-950">
      <Header />
      <div className="flex flex-1 flex-row max-w-full overflow-scroll">
        <SideBar language={selectedLanguage} setLanguage={setSelectedLanguage} />
        <div className="flex flex-col flex-1 p-2">
          <div className="flex flex-1 w-full">
            <ResizablePanelGroup direction="vertical" className="flex flex-1 p-0">
              <ResizablePanel className="flex-1 flex flex-col min-h-24 overflow-visible" defaultSize={600}>
                <CodeEditor
                  loading={loading}
                  setLoading={setLoading}
                  languageState={languageState}
                  setLanguageState={setLanguageState}
                  selectedLanguage={selectedLanguage}
                />
              </ResizablePanel>
              <ResizableHandle className="mt-4 mb-2 bg-neutral-900" withHandle />
              <ResizablePanel className="flex flex-col min-h-24">
                <CodeOutput
                  output={languageState[selectedLanguage].output}
                  executionError={languageState[selectedLanguage].hasError}
                  loading={loading}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
      <Footer language={languageState[selectedLanguage]} setSelectedLanguage={setSelectedLanguage} />
    </main>
  );
}
