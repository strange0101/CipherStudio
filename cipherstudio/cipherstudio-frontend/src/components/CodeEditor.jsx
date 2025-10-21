// import React from "react";
// import Editor from "@monaco-editor/react";

// export default function CodeEditor({ path, code, setCode }) {
//   const lang = path.endsWith(".css") ? "css" : path.endsWith(".html") ? "html" : "javascript";
//   return (
//     <div className="h-full flex flex-col">
//       <div className="p-2 border-b text-sm">{path}</div>
//       <div className="flex-1">
//         <Editor height="100%" language={lang} value={code} onChange={setCode} options={{ fontSize: 14, minimap:{enabled:false} }} />
//       </div>
//     </div>
//   );
// }

import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ path, code, setCode, theme }) {
  const lang = path.endsWith(".css")
    ? "css"
    : path.endsWith(".html")
    ? "html"
    : path.endsWith(".js")
    ? "javascript"
    : "plaintext";

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b text-sm bg-gray-200 dark:bg-gray-800 dark:text-gray-200 font-mono truncate">
        {path}
      </div>
      <Editor
        height="100%"
        language={lang}
        theme={theme === "dark" ? "vs-dark" : "light"}
        value={code}
        onChange={setCode}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}
