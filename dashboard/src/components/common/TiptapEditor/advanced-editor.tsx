import { useState, useImperativeHandle, forwardRef } from "react";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorRoot,
  ImageResizer,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
} from "novel";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { NodeSelector } from "./selectors/node-selector";
import { Separator } from "./ui/separator";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import "katex/dist/katex.min.css";
import "./prosemirror.css";
import Placeholder from "@tiptap/extension-placeholder";


const extensions = [
  ...defaultExtensions,
  slashCommand,
  Placeholder.configure({
    placeholder: "Start typing here...", // Customize your placeholder text
    emptyEditorClass: "is-editor-empty", // Optional: Add a class when the editor is empty
  }),
];

const TailwindAdvancedEditor = forwardRef(
  ({ initialContent }: { initialContent: string }, ref) => {
    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    const [openAI, setOpenAI] = useState(false);

    const [editorInstance, setEditorInstance] = useState<EditorInstance | null>(null);

    const defaultContent = { type: "doc", content: [{ type: "paragraph" }] }; // Empty paragraph

    // Expose editor instance and methods to the parent component
    useImperativeHandle(ref, () => ({
      getMarkdown: () => editorInstance?.storage.markdown.getMarkdown(),
      getHTML: () => editorInstance?.getHTML(),
      getJSON: () => editorInstance?.getJSON(),
    }));

    return (
      <div className="relative w-full max-w-screen min-h-[60vh] leading-8">
        <EditorRoot>
          <EditorContent
            initialContent={defaultContent}
            extensions={extensions}
            className="relative w-full max-w-screen border-muted h-full"
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
              handleDrop: (view, event, _slice, moved) =>
                handleImageDrop(view, event, moved, uploadFn),
              attributes: {
                class:
                  "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
              },
            }}
            onUpdate={({ editor }) => {
              setEditorInstance(editor); // Save the editor instance
              // debouncedUpdates(editor);
            }}
            onCreate={({ editor }) => {
              setEditorInstance(editor); // Save the editor instance
              if (initialContent) {
                editor.commands.setContent(initialContent);
              }
            }}
            slotAfter={<ImageResizer />}
          >
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    // @ts-expect-error
                    onCommand={(val) => item.command(val)}
                    className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>

            <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
              <Separator orientation="vertical" />
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <Separator orientation="vertical" />

              <LinkSelector open={openLink} onOpenChange={setOpenLink} />
              <Separator orientation="vertical" />
              <MathSelector />
              <Separator orientation="vertical" />
              <TextButtons />
              <Separator orientation="vertical" />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </GenerativeMenuSwitch>
          </EditorContent>
        </EditorRoot>
      </div>
    );
  }
);



export default TailwindAdvancedEditor;