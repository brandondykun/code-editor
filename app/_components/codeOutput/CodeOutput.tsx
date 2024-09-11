import { BarLoader } from 'react-spinners';
import { MdError } from 'react-icons/md';
import { RiCodeSSlashFill } from 'react-icons/ri';

type Props = {
  output: string;
  executionError: boolean;
  loading: boolean;
};

function CodeOutput({ output, executionError, loading }: Props) {
  return (
    <>
      <div className="text-neutral-400 text-sm pl-2 pb-2 flex flex-row gap-4 items-center font-play">
        <div className={`${executionError ? 'text-red-500' : ''}`}>OUTPUT</div>
        {executionError ? <MdError size={14} className="text-red-500" /> : null}
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-900 flex flex-col flex-1 overflow-scroll relative">
        <div className="absolute top-0 right-0 left-0">
          <BarLoader width="100%" height={2} loading={loading} color="#a3a3a3" />
        </div>
        <div className="p-2 whitespace-pre flex-1 text-neutral-300 font-sourceCodePro">{output}</div>
        {loading ? (
          <div className="absolute top-1 right-0 left-0 bottom-0 flex justify-center items-center">
            <div className="animate-pulse text-neutral-400 flex flex-row items-center gap-2">
              <RiCodeSSlashFill size={24} className="text-neutral-700" />
              <div className="font-play">Loading...</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default CodeOutput;
