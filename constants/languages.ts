import { FaGolang } from "react-icons/fa6";
import { IoLogoJavascript as JsIcon } from "react-icons/io5";
import { SiTypescript, SiPython } from "react-icons/si";
import { FaSwift, FaRust } from "react-icons/fa";
import { TbBrandKotlin } from "react-icons/tb";
import { DiRuby } from "react-icons/di";

import { LanguageState } from "@/types/types";

const shared = { code: "", output: "", hasError: false };

export const languageState: LanguageState = {
  javascript: { lang: "javascript", version: "18.15.0", icon: JsIcon, formattedName: "JavaScript", ...shared },
  typescript: { lang: "typescript", version: "5.0.3", icon: SiTypescript, formattedName: "TypeScript", ...shared },
  swift: { lang: "swift", version: "5.3.3", icon: FaSwift, formattedName: "Swift", ...shared },
  kotlin: { lang: "kotlin", version: "1.8.20", icon: TbBrandKotlin, formattedName: "Kotlin", ...shared },
  python: { lang: "python", version: "3.10.0", icon: SiPython, formattedName: "Python", ...shared },
  go: { lang: "go", version: "1.16.2", icon: FaGolang, formattedName: "GO", ...shared },
  ruby: { lang: "ruby", version: "3.0.1", icon: DiRuby, formattedName: "Ruby", ...shared },
  rust: { lang: "rust", version: "1.68.2", icon: FaRust, formattedName: "Rust", ...shared },
};

export const languageOptions = Object.values(languageState);
