/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";
import { FOLDER_STRUCTURE } from "./folderStructure";

const OPERATION = {
  ADD: "ADD",
  DEL: "DEL",
  EDIT: "EDIT",
};

function dfs(
  folders,
  targetPath,
  targetName,
  targetType,
  operation,
  parentPath = ""
) {
  const currPath = `${parentPath}/${folders.name}`;

  if (operation === OPERATION.DEL && currPath === targetPath) {
    return null;
  }

  if (operation === OPERATION.ADD && currPath === targetPath) {
    return {
      ...folders,
      children: [
        ...folders.children,
        { name: targetName, type: targetType, children: [] },
      ],
    };
  }

  if (folders.type === "file") {
    return {
      ...folders,
    };
  }

  return {
    ...folders,
    children: folders.children
      ?.map((child) =>
        dfs(child, targetPath, targetName, targetType, operation, currPath)
      )
      .filter(Boolean),
    name:
      operation === OPERATION.EDIT && currPath === targetPath
        ? targetName
        : folders.name,
  };
}

function App() {
  const [folderStructure, setFolderStructure] = useState(FOLDER_STRUCTURE);
  const [collapseFolder, setCollapseFolder] = useState(new Map());
  const [enableRenaming, setEnableRenaming] = useState(new Map());
  const [enableAdding, setEnableAdding] = useState(new Map());
  const [input, setInput] = useState("");
  const [addingType, setAddingType] = useState("file");

  const handleEnableRename = (path) => {
    const tempRenaming = new Map(enableRenaming);
    if (tempRenaming.has(path)) {
      tempRenaming.delete(path);
    } else {
      tempRenaming.set(path, true);
    }
    setEnableRenaming(tempRenaming);
  };

  const handleEnableAdding = (path, type = "folder") => {
    const tempEnableAdd = new Map(enableAdding);
    if (tempEnableAdd.has(path)) {
      tempEnableAdd.delete(path);
    } else {
      tempEnableAdd.set(path, true);
    }
    setEnableAdding(tempEnableAdd);
    setAddingType(type);
  };

  const handleExpand = (path) => {
    const tempExpand = new Map(collapseFolder);
    if (tempExpand.has(path)) {
      tempExpand.delete(path);
    } else {
      tempExpand.set(path, true);
    }
    setCollapseFolder(tempExpand);
  };

  const handleRename = (path, name) => {
    setFolderStructure((prev) => dfs(prev, path, name, "", OPERATION.EDIT));
    handleEnableRename(path);
    setInput("");
  };

  const handleDelete = (path) => {
    setFolderStructure((prev) => dfs(prev, path, "", "", OPERATION.DEL));
  };

  const handleAdding = (path, name) => {
    setFolderStructure((prev) =>
      dfs(prev, path, name, addingType, OPERATION.ADD)
    );
    handleEnableAdding(path);
    setInput("");
  };

  const renderFileStructure = (folders, parentPath = "") => {
    const currPath = `${parentPath}/${folders.name}`;
    if (collapseFolder.has(parentPath)) {
      return;
    }
    if (folders.type === "file") {
      return (
        <div>
          {enableRenaming.has(currPath) && (
            <>
              <input
                placeholder="Enter new name"
                className="folder"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button onClick={() => handleEnableRename(currPath)}>X</button>
              <button onClick={() => handleRename(currPath, input)}>+</button>
            </>
          )}
          {!enableRenaming.has(currPath) && (
            <>
              {folders.name}
              <button onClick={() => handleEnableRename(currPath)}>edit</button>
              <button onClick={() => handleDelete(currPath)}>delete</button>
            </>
          )}
        </div>
      );
    }

    return (
      <>
        {/**
         * Responsible for rendring
         * blank input in place of folder
         * for renaming stuff
         */}
        {enableRenaming.has(currPath) && (
          <div>
            <input
              placeholder="Enter new name"
              className="folder"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button onClick={() => handleEnableRename(currPath)}>X</button>
            <button onClick={() => handleRename(currPath, input)}>+</button>
          </div>
        )}
        {/**
         * responsible for rendering
         * folder itself only.
         */}
        {!enableRenaming.has(currPath) && (
          <div className="folder">
            <span onClick={() => handleExpand(currPath)} className="expand">
              {collapseFolder.has(currPath) ? "+ " : "- "}
            </span>
            {folders.name}
            <button onClick={() => handleEnableRename(currPath)}>edit</button>
            <button onClick={() => handleDelete(currPath)}>delete</button>
            <button onClick={() => handleEnableAdding(currPath)}>
              add folder
            </button>
            <button onClick={() => handleEnableAdding(currPath, "file")}>
              add file
            </button>
          </div>
        )}

        {/**
         * Reponsible for rendering
         * children of the folder
         */}
        <div className="folderChildren">
          {enableAdding.has(currPath) && (
            <div>
              <input
                placeholder="Enter new name"
                className="folder"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button onClick={() => handleEnableAdding(currPath)}>X</button>
              <button onClick={() => handleAdding(currPath, input)}>+</button>
            </div>
          )}
          {folders?.children?.map((folder) => {
            return renderFileStructure(folder, currPath);
          })}
        </div>
      </>
    );
  };

  return renderFileStructure(folderStructure);
}

export default App;
