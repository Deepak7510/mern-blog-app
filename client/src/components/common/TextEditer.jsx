import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function CustomEditor({ field }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  return (
    <ReactQuill
      {...field}
      modules={modules}
      theme="snow"
      className="bg-white"
    />
  );
}
