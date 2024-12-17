import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import { EditorToolbar } from "./EditorToolbar";
import Code from "@tiptap/extension-code";

export const TextEditor = ({ onChange }: { onChange: (content: string) => void }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Write something amazing...",
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            Code.configure({
                HTMLAttributes: { class: "inline-code" },
            }),
        ],
        content: "", // Initial content
        autofocus: true, // Focus the editor automatically when rendered
        editable: true, // Ensure the editor is editable
        onUpdate: ({ editor }) => {
            const html = editor.getHTML(); // Retrieve HTML content
            onChange(html); // Send the content to the parent component
        },
        onFocus: ({ event }) => {
            console.log("Editor focused", event); // Optional: Debugging or analytics
        },
        onBlur: ({ event }) => {
            console.log("Editor blurred", event); // Optional: Debugging or analytics
        },
    });
    

    return (
        <div className="border border-gray-300 rounded-lg shadow-sm">
            <EditorToolbar editor={editor} />
            <EditorContent
                editor={editor}
                className="prose-lg prose focus:outline-none p-4 text-gray-900"
            />
        </div>

    );
};

export default TextEditor;
