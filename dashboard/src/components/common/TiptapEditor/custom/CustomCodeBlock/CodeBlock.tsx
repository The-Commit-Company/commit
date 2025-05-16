import { useEffect, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { NodeViewWrapper } from '@tiptap/react';
import { coolGlow } from 'thememirror';
import './style.css';
import CopyButton from '@/components/common/CopyToClipboard/CopyToClipboard';
import { languageExtensions, languageOptions } from './languageOptions';



const CodeBlock = (props: any) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const code = props.node.attrs.content || "";

  const language = props.node.attrs.language || 'javascript';

  const fileName = props.node.attrs.file_name || '';

  const extensions = [
    languageExtensions[language] || javascript(),
  ];

  const { setContainer } = useCodeMirror({
    container: undefined,
    extensions,
    value: code,
    autoFocus: true,
    theme: coolGlow,
    onChange: (value: string) => {
      if (value !== code) {
        props.updateAttributes({ content: value });
      }
    },
  });

  useEffect(() => {
    if (editorRef.current) {
      setContainer(editorRef.current);

      // Handle Shift+Enter to exit code block
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault();
          const posAfter = props.getPos() + (props.node.nodeSize || 0);

          props.editor
            .chain()
            .insertContentAt(posAfter, { type: 'paragraph' })
            .focus()
            .run();

          props.editor.view.dispatch(
            // @ts-ignore
            window['prosemirror-state'].Selection.near(
              props.editor.view.state.doc.resolve(posAfter + 1)
            )
          );
        }
      };

      editorRef.current.addEventListener('keydown', handleKeyDown);

      return () => {
        editorRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [setContainer, props.getPos, props.node.nodeSize, props.editor]);

  // Language selector handler
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.updateAttributes({ language: e.target.value });
  };

  const updateFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileName = e.target.value;
    props.updateAttributes({ file_name: newFileName });
  }

  return (
    <NodeViewWrapper as="div" draggable={true} className="custom-code-block-wrapper gap-0">
      <div className="code-block-toolbar">
        <div className='flex flex-row gap-2'>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="rounded-md border border-gray-300 text-sm px-2 py-1 bg-white text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {languageOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={fileName}
            onChange={updateFileName}
            placeholder="File name"
            className="rounded-md border border-gray-300 text-sm px-2 py-1 bg-white text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <CopyButton value={code} type='button' className='h-6 w-6'/>
      </div>
      <div ref={editorRef} />
    </NodeViewWrapper>

  );
};

export default CodeBlock;