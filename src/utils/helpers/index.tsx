export const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}

export const createMyInfoFormData = (values: any) => {
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("email", values.email)
    formData.append("phoneNumber", values.phoneNumber)
    if (values.avatar) formData.append("avatar", values.avatar[0].originFileObj)

    return formData
}

export const createActivityFormData = (values: any) => {
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("subcategoryId", values.subcategoryId)
    formData.append("score", values.score)
    formData.append("maxParticipants", values.maxParticipants)
    formData.append("organizer", values.organizer)
    formData.append("address", values.address)
    formData.append("startDate", values.startDate)
    formData.append("endDate", values.endDate)
    formData.append("startRegistration", values.startRegistration)
    formData.append("endRegistration", values.endRegistration)
    if (values.image) formData.append("image", values.image[0].originFileObj)

    return formData
}

export const createProofInternalData = (values: any) => {
    const formData = new FormData()
    formData.append("name", values.name)
    if (values.image) formData.append("image", values.image[0].originFileObj)

    return formData
}

export const createProofExternalData = (values: any) => {
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("subcategoryId", values.subcategoryId)
    formData.append("score", values.score)
    formData.append("startDate", values.startDate)
    formData.append("endDate", values.endDate)
    formData.append("address", values.address)
    if (values.image) formData.append("image", values.image[0].originFileObj)

    return formData
}

export const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

export const styleOrEmpty = (condition: boolean, style: string) => (condition ? style : "")
