import React, { useState, useEffect } from 'react';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import './markdown.css'; // Import your custom styles for markdown
import 'katex/dist/katex.min.css';

// Plugins
import remarkMdx from 'remark-mdx';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from "rehype-pretty-code";
import CustomCodeBlock from '@/pages/features/custommdxcomponent/CustomCodeBlock';
import CustomHeading from '@/pages/features/custommdxcomponent/CustomHeading';

// Custom components
const CustomParagraph = ({ children }: { children?: React.ReactNode }) => {
    const hasParagraph = React.Children.toArray(children).some(
        (child) => React.isValidElement(child) && child.type === 'p'
    );

    if (hasParagraph) {
        return <>{children}</>; // Return children as is if they already contain <p>
    }

    return <p>{children}</p>; // Otherwise, wrap with <p>
};

// Custom component mapping
const components = {
    p: CustomParagraph,
    pre: CustomCodeBlock,
    h2: (props: any) => <CustomHeading {...props} as="h2" />,
    h3: (props: any) => <CustomHeading {...props} as="h3" />,
    h4: (props: any) => <CustomHeading {...props} as="h4" />,
    h5: (props: any) => <CustomHeading {...props} as="h5" />,
    h6: (props: any) => <CustomHeading {...props} as="h6" />,
};

const compileMDX = async (mdxContent: string) => {
    const compiled = await compile(mdxContent, {
        outputFormat: 'function-body',
        remarkPlugins: [remarkMdx, remarkMath, remarkBreaks, remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeKatex, rehypePrettyCode],
    });
    return String(compiled);
};

const renderMDX = async (compiledMdx: string, customComponents: any) => {
    try {
        const { default: MDXContent } = await run(compiledMdx, { ...runtime });

        // Wrap MDXContent with MDXProvider to use custom components
        const MDXWithProvider = (props: any) => <MDXContent {...props} components={customComponents} />


        return MDXWithProvider;
    } catch (error) {
        console.error('Error rendering MDX:', error);
        return null;
    }
};

const MDXRenderer = ({ mdxContent }: { mdxContent: string }) => {
    const [MDXComponent, setMDXComponent] = useState<React.ComponentType | null>(null);

    useEffect(() => {
        const renderContent = async () => {
            const compiledMdx = await compileMDX(mdxContent);
            const MDXContent = await renderMDX(compiledMdx, components);
            setMDXComponent(() => MDXContent);
        };

        renderContent();
    }, [mdxContent]);

    if (!MDXComponent) {
        return <MDXRendererSkeleton />;
    }

    return (
        <div className="markdown-body">
            <MDXComponent />
        </div>
    );
};

const MDXRendererSkeleton: React.FC = () => {
    return (
        <div className="markdown-body animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        </div>
    );
};

export default MDXRenderer;
