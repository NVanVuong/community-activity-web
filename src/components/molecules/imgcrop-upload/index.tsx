import { Upload } from "antd"
import ImgCrop from "antd-img-crop"
import { UploadProps } from "antd/lib"

export const ImgCropUpload: React.FC<UploadProps> = (props) => (
    <ImgCrop rotationSlider>
        <Upload {...props} />
    </ImgCrop>
)
