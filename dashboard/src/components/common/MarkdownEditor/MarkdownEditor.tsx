import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css';
import { useEffect } from 'react';
import { Editor } from '@milkdown/kit/core';
import './markdown.css'
import { useFrappeFileUpload } from 'frappe-react-sdk';

export interface MarkdownEditorProps {
    value: string;
    setCrepeInstance: React.Dispatch<React.SetStateAction<Promise<Editor> | null>>,
    docname: string;
}

const MarkdownEditor = ({ value, setCrepeInstance, docname }: MarkdownEditorProps) => {

    const { upload } = useFrappeFileUpload();

    useEffect(() => {
        const crepe = new Crepe({
            root: '#editor',
            defaultValue: value,
            featureConfigs: {
                'image-block': {
                    onUpload: async (file: File) => {
                        const result = await upload(file, {
                            doctype: 'Commit Docs Page',
                            docname: docname,
                            isPrivate: false,
                        });

                        if (!result || !result.file_url) {
                            throw new Error('Upload failed');
                        }

                        return result.file_url;
                    },
                },
            },
        }).create();

        setCrepeInstance(crepe);

        return () => {
            crepe.then((editor) => editor.destroy());
        };
    }, []);
    return (
        <div id="editor" className="markdown-editor">
        </div>

    );
};

export default MarkdownEditor