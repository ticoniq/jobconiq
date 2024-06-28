import { CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        h1: (props) => <h1 className="text-3xl font-bold mt-6 mb-4 font-clash" {...props} />,
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        li: ({ node, ...props }) => (
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span {...props} />
          </li>
        ),
        a: (props) => (
          <a className="text-brand-primary underline" target="_blank" {...props} />
        ),
        p: (props) => <p className="mb-4 text-base leading-6" {...props} />,
        strong: (props) => <strong className="font-semibold font-clash text-2xl" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}