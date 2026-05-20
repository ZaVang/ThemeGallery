import ReactMarkdown from 'react-markdown';

interface MarkdownNotesProps {
  markdown: string;
}

export function MarkdownNotes({ markdown }: MarkdownNotesProps) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}
