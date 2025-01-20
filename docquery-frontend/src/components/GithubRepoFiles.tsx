'use client'

import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, File, Folder, ChevronUp } from 'lucide-react'
import { parseFileTree, FileNode, getAllDescendantPaths } from '@/lib/fileTree'
import { cn } from '@/lib/utils'
import { Card } from './ui/card'

interface GitHubRepoFilesProps {
  paths: string[];
  selectedFiles: Set<string>;
  setSelectedFiles: (files: React.SetStateAction<Set<string>>) => void;
}

const FileTreeNode: React.FC<{
  node: FileNode;
  selectedFiles: Set<string>;
  onFileSelect: (path: string, isChecked: boolean) => void;
  level: number;
}> = ({ node, selectedFiles, onFileSelect, level }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const allDescendantPaths = getAllDescendantPaths(node)
  const allDescendantsSelected = allDescendantPaths.every(path => selectedFiles.has(path))
  const someDescendantsSelected = allDescendantPaths.some(path => selectedFiles.has(path))

  const handleCheckboxChange = (checked: boolean) => {
    if (node.isDirectory) {
      const descendantPaths = getAllDescendantPaths(node);
      descendantPaths.forEach(path => onFileSelect(path, checked));
    } else {
      onFileSelect(node.path, checked);
    }
  }

  return (
    <div className="flex items-start min-w-fit">
      <div style={{ width: `${level * 16}px` }} className="flex-shrink-0"></div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center space-x-1 py-1">
          {node.isDirectory ? (
            <Button variant="ghost" size="sm" className="p-0 h-6 w-6 flex-shrink-0" onClick={handleToggle}>
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          ) : (
            <File className="h-4 w-4 text-muted-foreground ml-1 flex-shrink-0" />
          )}
          <Checkbox
            id={node.path}
            checked={allDescendantsSelected}
            onCheckedChange={handleCheckboxChange}
            className="data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground flex-shrink-0"
            {...(someDescendantsSelected && !allDescendantsSelected ? { 'data-state': 'indeterminate' } : {})}
          />
          <label htmlFor={node.path} className="text-sm cursor-pointer select-none whitespace-nowrap">
            {node.name}
          </label>
        </div>
        {node.isDirectory && isOpen && node.children?.map((child, index) => (
          <FileTreeNode
            key={index}
            node={child}
            selectedFiles={selectedFiles}
            onFileSelect={onFileSelect}
            level={level + 1}
          />
        ))}
      </div>
    </div>
  )
}

export function GitHubRepoFiles({ paths, selectedFiles, setSelectedFiles }: GitHubRepoFilesProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  // const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const fileTree = parseFileTree(paths)

  const handleFileSelect = (path: string, isChecked: boolean) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev)
      if (isChecked) {
        newSet.add(path)
      } else {
        newSet.delete(path)
      }
      return newSet
    })
  }

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <div
        className="p-4 border-b flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-lg font-semibold flex items-center flex-wrap gap-4">
          <span>Repository Files</span>
          {!selectedFiles.size && <span className="text-sm text-muted-foreground">(Select files to ingest)</span>}
        </h2>
        <Button variant="ghost" size="sm" onClick={(e) => {
          e.stopPropagation()
          toggleExpand()
        }} aria-expanded={isExpanded}>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'} repository files</span>
        </Button>
      </div>
      {isExpanded && (
        <>
          <div className={cn(
            "h-[400px] w-full custom-scrollbar",
            "overflow-auto"
          )}>
            <div className="p-4 min-w-fit">
              {fileTree.map((node, index) => (
                <FileTreeNode
                  key={index}
                  node={node}
                  selectedFiles={selectedFiles}
                  onFileSelect={handleFileSelect}
                  level={0}
                />
              ))}
            </div>
          </div>
          <div className="p-4 border-t">
            <h3 className="text-sm font-semibold mb-2">Selected Files:</h3>
            <div className={cn(
              "h-[100px] w-full custom-scrollbar",
              "overflow-auto"
            )}>
              <ul className="text-sm min-w-fit">
                {Array.from(selectedFiles).map(file => (
                  <li key={file} className="py-1 whitespace-nowrap">{file}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}

