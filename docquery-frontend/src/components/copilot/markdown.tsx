import { FC, memo } from "react";
import ReactMarkdown, { Options, Components } from "react-markdown";
import { CodeBlock } from "./code-block";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children && prevProps.className === nextProps.className,
);

type MarkdownProps = {
  content: string;
};

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <div className="copilotKitMarkdown">
      <MemoizedReactMarkdown components={components} remarkPlugins={[remarkGfm, remarkMath]}>
        {content}
      </MemoizedReactMarkdown>
    </div>
  );
};

const components: Components = {
  p({ children }) {
    return <p className="text-black">{children}</p>;
  },
  a({ children, ...props }) {
    return (
      <a
        style={{ color: "blue", textDecoration: "underline" }}
        {...props}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  code({ children, className, ...props }) {
    if (Array.isArray(children) && children.length > 0) {
      if (typeof children[0] === "string" && children[0] === "▍") {
        return (
          <span
            style={{
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              marginTop: "0.25rem",
            }}
          >
            ▍
          </span>
        );
      }

      if (typeof children[0] === "string") {
        children[0] = children[0].replace("`▍`", "▍");
      }
    }

    const match = /language-(\w+)/.exec(className || "");

    return (
      <CodeBlock
        key={Math.random()}
        language={(match && match[1]) || ""}
        value={String(children).replace(/\n$/, "")}
        {...props}
      />
    );
  },
};
