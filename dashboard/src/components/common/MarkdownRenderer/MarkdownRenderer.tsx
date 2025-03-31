import React, { Suspense, lazy } from 'react'
const MarkdownRendererSuspense = lazy(() => import('./MarkdownRendererSuspense'))
interface MarkdownRendererProps {
    content: string,
    className?: string
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
    return <Suspense>
        <MarkdownRendererSuspense {...props} />
    </Suspense>
}