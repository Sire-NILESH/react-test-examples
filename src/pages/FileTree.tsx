import { ChevronRight, File, FileQuestion, Folder } from "lucide-react";
import { ComponentProps, useState } from "react";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { cn } from "../utils/cn";

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
    <Page>
      <PageHeader>
        <PageTitle>File Tree</PageTitle>
        <PageDescription className="text-muted-foreground max-w-lg">
          A demonstration of file tree using recursion
        </PageDescription>
      </PageHeader>

      <PageBody>
        <div className="mx-auto space-y-4 md:flex md:space-x-4 md:space-y-0">
          <ul>
            {dummyFileSystem.map((node, i) => (
              <li key={node.name + "-" + i}>
                <FileSystemItem node={node} />
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </Page>
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
          <File className="text-primary size-5 ml-1" />
        ) : (
          <FileQuestion className="text-primary size-5 ml-1" />
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
