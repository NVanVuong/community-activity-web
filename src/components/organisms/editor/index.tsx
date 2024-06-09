import ReactQuill, { Quill } from "react-quill"
import ImageResize from "quill-image-resize-module-react"
import { ImageActions } from "@xeger/quill-image-actions"
import { ImageFormats } from "@xeger/quill-image-formats"

Quill.register("modules/imageActions", ImageActions)
Quill.register("modules/imageFormats", ImageFormats)
Quill.register("modules/imageResize", ImageResize)

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image"]
    ],
    imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"]
    }
}

function Editor(props: any) {
    const handleDescriptionChange = (value: any, _delta: any, source: any) => {
        if (source === "user") {
            props.setDescription(value)
        }
    }
    return (
        <ReactQuill
            className="w-full"
            value={props.description}
            onChange={handleDescriptionChange}
            modules={modules}
            theme="snow"
        />
    )
}

export default Editor
