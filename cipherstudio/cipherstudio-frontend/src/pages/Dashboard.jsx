// import React, { useState, useEffect } from "react";
// import TopBar from "../components/TopBar";
// import FileTree from "../components/FileTree";
// import CodeEditor from "../components/CodeEditor";
// import LivePreview from "../components/LivePreview";
// import { request } from "../api/api";
// import { getToken } from "../utils/auth";

// const DEFAULT_FILES = {
//   "src/index.js": `import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\ncreateRoot(document.getElementById('root')).render(<App />);`,
//   "src/App.js": `import React from 'react';\nexport default function App(){ return <div>Hello CipherStudio</div>; }`,
//   "index.html": `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>CipherStudio</title></head><body><div id="root"></div></body></html>`
// };

// export default function Dashboard() {
//   const [files,setFiles] = useState(() => JSON.parse(localStorage.getItem('cipherstudio_files')) || DEFAULT_FILES);
//   const [activePath,setActivePath] = useState(Object.keys(files)[0]);
//   const [code,setCode] = useState(files[activePath]);
//   const [theme,setTheme] = useState(localStorage.getItem('cipherstudio_theme') || 'light');
//   const [autosave,setAutosave] = useState(JSON.parse(localStorage.getItem('cipherstudio_autosave')||'true'));
//   const token = getToken();

//   useEffect(()=>{ setCode(files[activePath] || ''); }, [activePath, files]);
//   useEffect(()=>{ document.documentElement.classList.toggle('dark', theme==='dark'); localStorage.setItem('cipherstudio_theme',theme); }, [theme]);
//   useEffect(()=>{ localStorage.setItem('cipherstudio_autosave',autosave); }, [autosave]);
//   useEffect(()=>{ if(autosave) localStorage.setItem('cipherstudio_files', JSON.stringify(files)); }, [files, autosave]);

//   const handleCodeChange = val => { setCode(val); setFiles(prev=>({...prev,[activePath]:val})); };

//   const handleCreateFile = () => {
//     const name = `src/file-${Date.now()}.js`;
//     setFiles(prev=>({...prev,[name]:`export default function(){return <div>${name}</div>;}`}));
//     setActivePath(name);
//   };
//   const handleCreateFolder = () => {
//     const name = `folder-${Date.now()}/`;
//     setFiles(prev=>({...prev,[name]:''}));
//   };
//   const handleDelete = path => { const copy = {...files}; delete copy[path]; setFiles(copy); if(activePath===path) setActivePath(Object.keys(copy)[0]); };
//   const handleRename = (oldPath,newPath)=>{ const copy={...files}; copy[newPath]=copy[oldPath]; delete copy[oldPath]; setFiles(copy); if(activePath===oldPath)setActivePath(newPath); };

//   const handleSaveProject = async ()=>{
//     localStorage.setItem('cipherstudio_files',JSON.stringify(files));
//     try{
//       if(!token) { alert('Saved locally'); return; }
//       const project = await request('/projects','POST',{name:'MyProject'},token);
//       for(const [path,content] of Object.entries(files)){
//         // await request('/files','POST',{projectId:project._id,parentId:null,name:path,type:'file',s3Key:null,content},token);
//         await request('/files','POST',{
//   projectId:project._id,
//   parentId:null,
//   name:path,
//   type:'file',
//   s3Key:null,  // no S3 needed
//   content // this is important
// },token);
//       }
//       alert('Project saved to backend');
//     }catch(e){ console.error(e); alert('Save failed'); }
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
//       <TopBar onSaveProject={handleSaveProject} onToggleTheme={()=>setTheme(t=>t==='dark'?'light':'dark')} theme={theme} autosave={autosave} setAutosave={setAutosave} />
//       <div className="flex flex-1 overflow-hidden">
//         <div className="w-72 border-r bg-white dark:bg-gray-900">
//           <FileTree files={files} activePath={activePath} onSelect={setActivePath} onCreateFile={handleCreateFile} onCreateFolder={handleCreateFolder} onDelete={handleDelete} onRename={handleRename} />
//         </div>
//         <div className="flex-1 flex flex-col">
//           <div className="flex-1 flex">
//             <div className="w-1/2 border-r">{activePath && <CodeEditor path={activePath} code={code} setCode={handleCodeChange} />}</div>
//             <div className="w-1/2"><LivePreview files={files} /></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import FileTree from "../components/FileTree";
import CodeEditor from "../components/CodeEditor";
import LivePreview from "../components/LivePreview";
import { request } from "../api/api";
import { getToken } from "../utils/auth";

const DEFAULT_FILES = {
 
  "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CipherStudio</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,

  "src/index.js": `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")).render(<App />);`,

  "src/App.js": `import React from "react";
export default function App() {
  return <div style={{textAlign:"center",marginTop:"50px"}}>🚀 Welcome to CipherStudio IDE!</div>;
}`,
};

export default function Dashboard() {
  const [files, setFiles] = useState(() => JSON.parse(localStorage.getItem("cipherstudio_files")) || DEFAULT_FILES);
  const [activePath, setActivePath] = useState(Object.keys(files)[0]);
  const [theme, setTheme] = useState(localStorage.getItem("cipherstudio_theme") || "light");
  const [autosave, setAutosave] = useState(JSON.parse(localStorage.getItem("cipherstudio_autosave") || "true"));
  const token = getToken();

  // Dark/light mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("cipherstudio_theme", theme);
  }, [theme]);

  // Auto-save files
  useEffect(() => {
    if (autosave) localStorage.setItem("cipherstudio_files", JSON.stringify(files));
  }, [files, autosave]);

  useEffect(() => localStorage.setItem("cipherstudio_autosave", autosave), [autosave]);

  // Update file content
  const handleCodeChange = (val) => setFiles(prev => ({ ...prev, [activePath]: val }));

  // Create new file
  const handleCreateFile = (name) => {
    if (!name) return;
    const path = name.includes("/") ? name : `src/${name}`;
    setFiles(prev => ({ ...prev, [path]: `import React from "react";\nexport default function(){ return <div>Hello from ${path}</div>; }` }));
    setActivePath(path);
  };

  // Create new folder
  const handleCreateFolder = (name) => {
    if (!name) return;
    const path = name.endsWith("/") ? name : name + "/";
    setFiles(prev => ({ ...prev, [path]: "" }));
  };

  // Delete file/folder
  const handleDelete = (path) => {
    const copy = { ...files };
    delete copy[path];
    setFiles(copy);
    if (activePath === path) setActivePath(Object.keys(copy)[0] || "");
  };

  // Rename file/folder
  const handleRename = (oldPath, newPath) => {
    if (!newPath) return;
    const copy = { ...files };
    copy[newPath] = copy[oldPath];
    delete copy[oldPath];
    setFiles(copy);
    if (activePath === oldPath) setActivePath(newPath);
  };

  // Save project
  const handleSaveProject = async () => {
    try {
      localStorage.setItem("cipherstudio_files", JSON.stringify(files));
      if (!token) return alert("⚠️ Saved locally (no token found).");

      const project = await request("/projects", "POST", { name: "CipherStudio Project" }, token);
      for (const [path, content] of Object.entries(files)) {
        await request("/files", "POST", {
          projectId: project._id,
          name: path,
          type: path.endsWith("/") ? "folder" : "file",
          content
        }, token);
      }
      alert("✅ Project saved to backend!");
    } catch (err) {
      console.error(err);
      alert("❌ Save failed. Check console.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <TopBar
        onSaveProject={handleSaveProject}
        onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
        theme={theme}
        autosave={autosave}
        setAutosave={setAutosave}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* File Tree */}
        <div className="w-72 border-r bg-white dark:bg-gray-800">
          <FileTree
            files={files}
            activePath={activePath}
            onSelect={setActivePath}
            onCreateFile={handleCreateFile}
            onCreateFolder={handleCreateFolder}
            onDelete={handleDelete}
            onRename={handleRename}
          />
        </div>

        {/* Editor & Preview */}
        <div className="flex-1 flex">
          <div className="w-1/2 border-r">
            {activePath && (
              <CodeEditor
                path={activePath}
                code={files[activePath]}
                setCode={handleCodeChange}
                theme={theme}
              />
            )}
          </div>
          <div className="w-1/2">
            <LivePreview files={{ ...files }} /> {/* ✅ force re-render */}
          </div>
        </div>
      </div>
    </div>
  );
}
