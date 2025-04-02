import React from 'react'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './markdown.css'

interface MarkdownRendererProps {
    content: string,
    className?: string
}

const MarkdownRendererSuspense: React.FC<MarkdownRendererProps> = ({ content, className }) => {
    return <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className={className ? className : 'markdown'}>
        {content}
    </ReactMarkdown>
}

export default MarkdownRendererSuspense