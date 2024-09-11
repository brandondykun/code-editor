import axios from "axios";

// When using the public Piston API, use the following two URLs:
// GET  https://emkc.org/api/v2/piston/runtimes
// POST https://emkc.org/api/v2/piston/execute

const PISTON_RUN_TIMES = "https://emkc.org/api/v2/piston/runtimes";
const PISTON_EXECUTE = "https://emkc.org/api/v2/piston/execute";

export const executeCode = async (code: string, language: { lang: string; version: string }) => {
  const res = await axios.post(PISTON_EXECUTE, {
    language: language.lang,
    version: language.version,
    files: [
      {
        content: code,
      },
    ],
    stdin: "",
    args: [],
    compile_timeout: 10000,
    run_timeout: 3000,
    compile_memory_limit: -1,
    run_memory_limit: -1,
  });

  return res;
};
