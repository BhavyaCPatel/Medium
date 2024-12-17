import { Editor } from "@tiptap/core";

export const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    return (
        <div className="flex gap-2 m-2 border-b pb-2">
            {/* Bold */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded ${
                    editor.isActive("bold") ? "bg-blue-200" : "bg-gray-200"
                }`}
            >
                Bold
            </button>

            {/* Italic */}
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded ${
                    editor.isActive("italic") ? "bg-blue-200" : "bg-gray-200"
                }`}
            >
                Italic
            </button>

            {/* H1 */}
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-3 py-1 rounded ${
                    editor.isActive("heading", { level: 1 }) ? "bg-blue-200" : "bg-gray-200"
                }`}
            >
                H1
            </button>

            {/* H2 */}
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-3 py-1 rounded ${
                    editor.isActive("heading", { level: 2 }) ? "bg-blue-200" : "bg-gray-200"
                }`}
            >
                H2
            </button>

            {/* H3 */}
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-3 py-1 rounded ${
                    editor.isActive("heading", { level: 3 }) ? "bg-blue-200" : "bg-gray-200"
                }`}
            >
                H3
            </button>

            {/* Code */}
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`px-3 py-1 rounded ${
                    editor.isActive("code") ? "bg-blue-200" : "bg-gray-200"
                }`}
            >
                Code
            </button>

            {/* Clear Formatting */}
            <button
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className="px-3 py-1 bg-red-200 rounded"
            >
                Clear
            </button>
        </div>
    );
};
