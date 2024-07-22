import React, { ComponentProps, useState } from "react";
import { cn } from "../utils/cn";
import { ChevronRight, File, FileQuestion, Folder } from "lucide-react";

type NodeType = "file" | "folder";

interface Node {
  name: string;
  type: NodeType;
  subTree?: Node[];
}

const dummyFileSystem: Node[] = [
  {
    name: "C:",
    type: "folder",
    subTree: [
      {
        name: "Program Files",
        type: "folder",
        subTree: [
          {
            name: "Common Files",
            type: "folder",
            subTree: [
              {
                name: "Adobe",
                type: "folder",
                subTree: [
                  {
                    name: "Acrobat",
                    type: "file",
                  },
                ],
              },
              {
                name: "shared-data",
                type: "file",
              },
            ],
          },
          {
            name: "Google",
            type: "folder",
            subTree: [
              {
                name: "Chrome",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        name: "Users",
        type: "folder",
        subTree: [
          {
            name: "Public",
            type: "folder",
            subTree: [
              {
                name: "Documents",
                type: "folder",
                subTree: [
                  {
                    name: "Sample.docx",
                    type: "file",
                  },
                ],
              },
            ],
          },
          {
            name: "User1",
            type: "folder",
            subTree: [
              {
                name: "Desktop",
                type: "folder",
                subTree: [
                  {
                    name: "shortcut.lnk",
                    type: "file",
                  },
                ],
              },
              {
                name: "Documents",
                type: "folder",
                subTree: [
                  {
                    name: "Resume.pdf",
                    type: "file",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Windows",
        type: "folder",
        subTree: [
          {
            name: "System32",
            type: "folder",
            subTree: [
              {
                name: "config.sys",
                type: "file",
              },
            ],
          },
        ],
      },
    ],
  },
];

const FileTree = () => {
  return (
    <div className="mx-auto container p-2">
      <header className="mt-10 sm:mt-0 mb-10">
        <h2 className="font-semibold text-lg">File Tree</h2>
        <p className="text-muted-foreground">
          A demonstration of file tree using recursion
        </p>
      </header>

      <div className="mx-auto space-y-4 md:flex md:space-x-4 md:space-y-0">
        <ul>
          {dummyFileSystem.map((node, i) => (
            <li key={node.name + "-" + i}>
              <FileSystemItem node={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileTree;

interface FileSystemItemProps extends ComponentProps<"div"> {
  node: Node;
}

const FileSystemItem = ({ node, className, ...props }: FileSystemItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("my-2", className)} {...props}>
      <div className="flex items-center space-x-2">
        {node.type === "folder" ? (
          <button
            className="flex items-center justify-center p-1 rounded-full hover:bg-secondary"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <ChevronRight className={cn("size-4", isOpen && "rotate-90")} />
          </button>
        ) : null}

        {node.type === "folder" ? (
          <Folder className="text-yellow-500 size-5" />
        ) : node.type === "file" ? (
          <File className="text-primary size-5" />
        ) : (
          <FileQuestion className="text-primary size-5" />
        )}

        <span>{node.name}</span>
      </div>

      <ul>
        {isOpen &&
          node.subTree?.map((subTreeNode, i) => (
            <li key={subTreeNode.name + "-" + i}>
              <FileSystemItem node={subTreeNode} className="ml-7" />
            </li>
          ))}
      </ul>
    </div>
  );
};
