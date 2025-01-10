import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css';
import { useEffect } from 'react';
import { Editor } from '@milkdown/kit/core';
import './markdown.css'

export interface MarkdownEditorProps {
    value: string;
    setCrepeInstance: React.Dispatch<React.SetStateAction<Promise<Editor> | null>>
}

const MarkdownEditor = ({ value, setCrepeInstance }: MarkdownEditorProps) => {

    useEffect(() => {
        const crepe = new Crepe({
            root: '#editor',
            defaultValue: value,
        }).create()
        setCrepeInstance(crepe);

        return () => {
            crepe.then((editor) => {
                editor.destroy();
            });
        };
    }, []);

    return (
        <div id="editor" className="markdown-editor">
            {/* The editor will be initialized here */}
        </div>

    );
};

export default MarkdownEditor