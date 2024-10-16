import React, { ComponentType } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
const Editor = dynamic<EditorProps>(
  async () => {
    const mod = await import("react-draft-wysiwyg");
    return { default: mod.Editor as unknown as ComponentType<EditorProps> };
  },
  { ssr: false }
);
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ITemplateEditorProps } from "./TemplateEditor.types";

const TemplateEditor: React.FC<ITemplateEditorProps> = ({
  editorState,
  setEditorState,
}) => {
  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  return (
    <div className="w-full">
      <Editor
        toolbar={{
          fontFamily: {
            options: [
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Times New Roman",
              "Verdana",
            ],
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          },
        }}
        editorState={editorState}
        editorClassName="!h-[300px] border border-input mt-8 px-3 py-2 bg-white"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TemplateEditor;
