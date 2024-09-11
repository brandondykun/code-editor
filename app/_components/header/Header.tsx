import SettingsSheet from '../settingsSheet/SettingsSheet';

function Header() {
  return (
    <div className="py-2 dark:bg-neutral-950 flex flex-row items-center justify-between border-b border-b-neutral-800 pr-2 font-play">
      <div className="flex flex-row items-center">
        <div className="text-neutral-300 px-6 font-play text-xl">
          <span className="text-cyan-500">{'< '}</span>
          <span className="text-neutral-300">Code</span>
          <span className="text-cyan-500">{' />'}</span>
        </div>
      </div>
      <SettingsSheet />
    </div>
  );
}

export default Header;
