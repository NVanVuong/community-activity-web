import { Button, Form, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/molecules/title-modal"
import { IModal } from "@/redux/features/modal/modal.slice"
import Editor from "@/components/organisms/editor"
import { useState } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { createProofInternalData, normFile } from "@/utils/helpers"
import { ImgCropUpload } from "@/components/molecules/imgcrop-upload"
import { IUserActivity } from "@/interfaces/useractivity.interface"
import { useSubmitProofMutation } from "@/redux/services/activities/activities.service"

const SubmitProof = (props: IModal) => {
    const { title } = props
    const myActivity = props.data as IUserActivity
    const [submitProof, { data, error, isLoading }] = useSubmitProofMutation()

    const [description, setDescription] = useState("")

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const formData = createProofInternalData(values)

        formData.append("description", description)

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1])
        }

        await submitProof({
            id: myActivity.id,
            formData: formData
        })
    }

    return (
        <div className="w-160">
            <Spin spinning={isLoading}>
                <Title>{title}</Title>
                <Form
                    onFinish={onFinish}
                    requiredMark={false}
                    layout="vertical"
                    className="flex w-full flex-col items-center"
                >
                    <Form.Item
                        className="w-full"
                        name="image"
                        label={<span className="font-semibold">Image of proof</span>}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <ImgCropUpload
                            action="https://run.mocky.io/v3/fae6fba5-8ef1-45f8-93c2-6304edaedd3f"
                            headers={{
                                authorization: "authorization-text",
                                "Access-Control-Allow-Origin": "*"
                            }}
                            listType="picture"
                        >
                            <Button
                                icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
                                className="flex h-10 flex-row-reverse items-center justify-between gap-2"
                            >
                                Upload proof
                            </Button>
                        </ImgCropUpload>
                    </Form.Item>

                    <Editor description={description} setDescription={setDescription} />

                    <Button type="primary" htmlType="submit" className="mt-6 h-10 w-full bg-primary text-white">
                        Finish
                    </Button>
                </Form>
            </Spin>
        </div>
    )
}

export default SubmitProof
