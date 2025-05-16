import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlock from "./CodeBlock";
import { Node, mergeAttributes } from '@tiptap/core';

export const CustomCodeBlock = Node.create({
    name: 'customCodeBlock',
    group: 'block',
    draggable: true,
    selectable: true,
    content: '', // Leaf node
    atom: true,  // Leaf-like behavior

    addAttributes() {
        return {
            content: {
                default: '',
                parseHTML: element => element.getAttribute('content') || element.innerText || '',
                renderHTML: attributes => ({
                    content: attributes.content,
                }),
            },
            language: {
                default: 'javascript',
                parseHTML: element => element.getAttribute('language') || 'javascript',
                renderHTML: attributes => ({
                    language: attributes.language,
                }),
            },
            file_name: {
                default: '',
                parseHTML: element => element.getAttribute('file_name') || '',
                renderHTML: attributes => ({
                    file_name: attributes.file_name,
                }),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="custom-code-block"]',
                getAttrs: (el: HTMLElement) => ({
                    content: el.getAttribute('content') || el.innerText || '',
                    language: el.getAttribute('language') || 'javascript',
                    file_name: el.getAttribute('file_name') || '',
                }),
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(
                HTMLAttributes,
                {
                    'data-type': 'custom-code-block',
                    language: HTMLAttributes.language || 'javascript',
                    content: HTMLAttributes.content || '',
                    file_name: HTMLAttributes.file_name || '',
                }
            ),
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(CodeBlock);
    },

    addCommands() {
        return {
            toggleCodeBlock:
                () =>
                    ({ commands }) => {
                        return commands.toggleNode(this.name, 'paragraph');
                    },
        };
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const { state, view } = editor;
                const { $from } = state.selection;
                const posAfter = $from.after();
                if (!state.doc.nodeAt(posAfter)) {
                    editor.chain().insertContentAt(posAfter, { type: 'paragraph' }).focus().run();
                    view.dispatch(
                        view.state.tr.setSelection(
                            // @ts-ignore
                            window['prosemirror-state'].Selection.near(
                                view.state.doc.resolve(posAfter + 1)
                            )
                        )
                    );
                    return true;
                }
                return false;
            },
            ArrowDown: ({ editor }) => {
                const { state, view } = editor;
                const { $from } = state.selection;
                const posAfter = $from.after();
                if (!state.doc.nodeAt(posAfter)) {
                    editor.chain().insertContentAt(posAfter, { type: 'paragraph' }).focus().run();
                    view.dispatch(
                        view.state.tr.setSelection(
                            // @ts-ignore
                            window['prosemirror-state'].Selection.near(
                                view.state.doc.resolve(posAfter + 1)
                            )
                        )
                    );
                    return true;
                }
                return false;
            },
        };
    },
});