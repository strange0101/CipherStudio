// import React, { useState } from "react";

// export default function FileTree({ files, activePath, onSelect, onCreateFile, onCreateFolder, onDelete, onRename }) {
//   const [newName, setNewName] = useState('');
//   const [renaming, setRenaming] = useState(null);
//   const entries = Object.keys(files).sort();

//   return (
//     <div className="h-full flex flex-col p-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <div className="mb-2 flex gap-2">
//         <button onClick={onCreateFile} className="text-xs px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700">New File</button>
//         <button onClick={onCreateFolder} className="text-xs px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700">New Folder</button>
//       </div>
//       <div className="overflow-auto flex-1">
//         {entries.map((path) => {
//           const isActive = path === activePath;
//           const isFile = !path.endsWith('/');
//           return (
//             <div 
//               key={path} 
//               className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer
//                 ${isActive ? 'bg-indigo-100 dark:bg-indigo-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
//               `}
//             >
//               <div onClick={() => onSelect(path)} className="flex items-center gap-2">
//                 <span className="text-xs">{isFile ? '📄' : '📁'}</span>
//                 {renaming === path ? (
//                   <input 
//                     className="text-sm bg-transparent border-b focus:outline-none dark:text-gray-100" 
//                     value={newName} 
//                     onChange={(e) => setNewName(e.target.value)} 
//                     onKeyDown={(e) => { 
//                       if(e.key === 'Enter'){ 
//                         onRename(path, newName); 
//                         setRenaming(null);
//                       } 
//                     }} 
//                   />
//                 ) : (
//                   <span className="text-sm">{path}</span>
//                 )}
//               </div>
//               <div className="flex gap-1">
//                 <button 
//                   className="text-xs px-1 hover:underline" 
//                   onClick={() => { setRenaming(path); setNewName(path); }}
//                 >
//                   Rename
//                 </button>
//                 <button 
//                   className="text-xs px-1 text-red-600 hover:underline" 
//                   onClick={() => onDelete(path)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function FileTree({ files, activePath, onSelect, onCreateFile, onCreateFolder, onDelete, onRename }) {
  const [expanded, setExpanded] = useState({});
  const [renaming, setRenaming] = useState(null);
  const [newName, setNewName] = useState("");

  const buildTree = (paths) => {
    const tree = {};
    Object.keys(paths).forEach((path) => {
      const parts = path.split("/");
      let current = tree;
      parts.forEach((part, idx) => {
        if (!current[part]) {
          current[part] = { __isFolder: idx < parts.length - 1, __children: {} };
        }
        if (idx < parts.length - 1) current = current[part].__children;
      });
    });
    return tree;
  };

  const toggleFolder = (path) => setExpanded(prev => ({ ...prev, [path]: !prev[path] }));

  const renderTree = (tree, basePath = "", level = 0) => {
    return Object.entries(tree).map(([name, node]) => {
      const fullPath = basePath ? `${basePath}/${name}` : name;
      const isFolder = node.__isFolder;
      const isExpanded = expanded[fullPath];
      const paddingLeft = level * 14;

      return (
        <div key={fullPath}>
          <div
            className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
              activePath === fullPath
                ? "bg-indigo-100 dark:bg-indigo-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{ paddingLeft }}
          >
            <div
              className="flex items-center gap-2 flex-1"
              onClick={() => {
                if (isFolder) toggleFolder(fullPath);
                else onSelect(fullPath); // ✅ select only files
              }}
            >
              <span>{isFolder ? (isExpanded ? "📂" : "📁") : "📄"}</span>
              {renaming === fullPath ? (
                <input
                  value={newName}
                  className="text-sm bg-transparent border-b focus:outline-none dark:text-gray-100 w-full"
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onRename(fullPath, newName);
                      setRenaming(null);
                    }
                  }}
                />
              ) : (
                <span className="text-sm truncate">{name}</span>
              )}
            </div>

            <div className="flex gap-1">
              <button
                className="text-xs px-1 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setRenaming(fullPath);
                  setNewName(name);
                }}
              >
                ✏️
              </button>
              <button
                className="text-xs px-1 text-red-600 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(fullPath);
                }}
              >
                🗑️
              </button>
            </div>
          </div>

          {isFolder && isExpanded && (
            <div className="ml-2">{renderTree(node.__children, fullPath, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  const tree = buildTree(files);

  return (
    <div className="h-full flex flex-col p-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="mb-2 flex gap-2">
        <button
          onClick={() => {
            const name = prompt("Enter file name (with extension e.g., App.js):");
            if (name) onCreateFile(name);
          }}
          className="text-xs px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          + File
        </button>
        <button
          onClick={() => {
            const name = prompt("Enter folder name:");
            if (name) onCreateFolder(name);
          }}
          className="text-xs px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          + Folder
        </button>
      </div>

      <div className="overflow-auto flex-1 text-sm">{renderTree(tree)}</div>
    </div>
  );
}
