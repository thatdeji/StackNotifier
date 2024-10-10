import { EditorState } from "draft-js";
import { Dispatch, SetStateAction } from "react";

export interface ITemplateEditorProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}
