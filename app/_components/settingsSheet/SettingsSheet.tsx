'use client';

import { IoIosRemove, IoIosAdd, IoMdSettings } from 'react-icons/io';

import { useSettings } from '@/app/_context/SettingContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CursorBlinking, CursorStyle } from '@/types/types';
import SettingsCheckbox from '../settingsCheckbox/SettingsCheckbox';

function SettingsSheet() {
  const { settings, setSettings } = useSettings();

  const handleFontSizeChange = (direction: 'add' | 'subtract') => {
    if (direction === 'add') {
      if (settings.fontSize < 24) {
        setSettings((prev) => ({ ...prev, fontSize: prev.fontSize + 1 }));
      }
    } else if (settings.fontSize > 6) {
      setSettings((prev) => ({ ...prev, fontSize: prev.fontSize - 1 }));
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <IoMdSettings size={24} className="text-neutral-300" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-neutral-500 mb-6 border-b border-neutral-900 border-solid pb-4">
            Editor Settings
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-6 justify-between">
            <Label htmlFor="cursor-style" className="text-neutral-300 text-md">
              Cursor Style
            </Label>
            <Select
              onValueChange={(val) => setSettings((prev) => ({ ...prev, cursorStyle: val as CursorStyle }))}
              defaultValue="line"
              value={settings.cursorStyle}
            >
              <SelectTrigger className="w-[160px] h-8" id="cursor-style">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="block">Block</SelectItem>
                <SelectItem value="underline">Underline</SelectItem>
                <SelectItem value="line-thin">Line Thin</SelectItem>
                <SelectItem value="block-outline">Block Outline</SelectItem>
                <SelectItem value="underline-thin">Underline Thin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row items-center gap-6 justify-between">
            <Label htmlFor="cursor-blinking" className="text-neutral-300 text-md">
              Cursor Blinking
            </Label>
            <Select
              onValueChange={(val) => setSettings((prev) => ({ ...prev, cursorBlinking: val as CursorBlinking }))}
              defaultValue="blink"
              value={settings.cursorBlinking}
            >
              <SelectTrigger className="w-[120px] h-8" id="cursor-blinking">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blink">Blink</SelectItem>
                <SelectItem value="smooth">Smooth</SelectItem>
                <SelectItem value="phase">Phase</SelectItem>
                <SelectItem value="expand">Expand</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row items-center gap-6 justify-between">
            <Label htmlFor="tab-size" className="text-neutral-300 text-md">
              Tab Size
            </Label>
            <Select
              onValueChange={(val) => setSettings((prev) => ({ ...prev, tabSize: val }))}
              defaultValue="2"
              value={settings.tabSize}
            >
              <SelectTrigger className="w-[80px] h-8" id="tab-size">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-row items-center gap-6 justify-between">
            <Label className="text-neutral-300 text-md">Font Size</Label>
            <div className="flex flex-row items-center gap-4">
              <Button
                className="p-0 h-6 w-6"
                variant="ghost"
                disabled={settings.fontSize === 6}
                onClick={() => handleFontSizeChange('subtract')}
              >
                <IoIosRemove size={20} />
              </Button>
              <span className="text-md text-neutral-300">{settings.fontSize}</span>
              <Button
                className="p-0 h-6 w-6"
                variant="ghost"
                disabled={settings.fontSize === 24}
                onClick={() => handleFontSizeChange('add')}
              >
                <IoIosAdd size={20} />
              </Button>
            </div>
          </div>

          <SettingsCheckbox
            label="Bold Font"
            id="bold-font"
            checked={settings.fontWeight === '600'}
            onCheckedChange={() => {
              setSettings((prev) => ({ ...prev, fontWeight: prev.fontWeight === '100' ? '600' : '100' }));
            }}
          />

          <SettingsCheckbox
            label="Code Folding"
            id="code-folding"
            checked={settings.folding}
            onCheckedChange={(val) => {
              setSettings((prev) => ({ ...prev, folding: val }));
            }}
          />

          <SettingsCheckbox
            label="Match Brackets"
            id="match-brackets"
            checked={settings.matchBrackets === 'always'}
            onCheckedChange={(val) => {
              setSettings((prev) => ({ ...prev, matchBrackets: val ? 'always' : 'never' }));
            }}
          />

          <SettingsCheckbox
            label="Auto Close Brackets"
            id="auto-close-brackets"
            checked={settings.autoCloseBrackets === 'always'}
            onCheckedChange={(val) => {
              setSettings((prev) => ({ ...prev, autoCloseBrackets: val ? 'always' : 'never' }));
            }}
          />

          <SettingsCheckbox
            label="Auto Close Quotes"
            id="auto-close-quotes"
            checked={settings.autoClosingQuotes === 'always'}
            onCheckedChange={(val) => {
              setSettings((prev) => ({ ...prev, autoClosingQuotes: val ? 'always' : 'never' }));
            }}
          />

          <SettingsCheckbox
            label="Auto Indent"
            id="auto-indent"
            checked={settings.autoIndent === 'advanced'}
            onCheckedChange={(val) => {
              setSettings((prev) => ({ ...prev, autoIndent: val ? 'advanced' : 'none' }));
            }}
          />

          <SettingsCheckbox
            label="Mini Map"
            id="mini-map"
            checked={settings.miniMapEnabled}
            onCheckedChange={(val) => {
              setSettings((prev) => ({ ...prev, miniMapEnabled: val }));
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SettingsSheet;
