export interface FileNode {
  name: string;
  path: string;
  children?: FileNode[];
  isDirectory: boolean;
}

export function parseFileTree(paths: string[]): FileNode[] {
  const root: FileNode = {
    name: "",
    path: "",
    children: [],
    isDirectory: true,
  };

  paths.forEach((path) => {
    const parts = path.split("/");
    let currentNode = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      let existingChild = currentNode.children?.find(
        (child) => child.name === part,
      );

      if (!existingChild) {
        const newNode: FileNode = {
          name: part,
          path: parts.slice(0, index + 1).join("/"),
          isDirectory: !isLast,
          children: !isLast ? [] : undefined,
        };
        currentNode.children?.push(newNode);
        existingChild = newNode;
      }

      if (!isLast) {
        currentNode = existingChild;
      }
    });
  });

  const sortNodes = (nodes: FileNode[]): FileNode[] => {
    return nodes.sort((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        return a.name.localeCompare(b.name);
      }
      return a.isDirectory ? -1 : 1;
    });
  };

  const processNode = (node: FileNode): FileNode => {
    if (node.children) {
      node.children = sortNodes(node.children.map(processNode));
    }
    return node;
  };

  return sortNodes(root.children?.map(processNode) || []);
}

export function getAllDescendantPaths(node: FileNode): string[] {
  let paths: string[] = [];
  if (!node.isDirectory) {
    paths.push(node.path);
  } else {
    node.children?.forEach((child) => {
      paths = paths.concat(getAllDescendantPaths(child));
    });
  }
  return paths;
}
