import React from "react";
import { Editor } from "react-draft-wysiwyg";
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
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="!h-[300px] border border-input mt-8 px-3 py-2 bg-white"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TemplateEditor;
