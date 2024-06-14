import { IBaseQuery, IBaseRespone } from "./base.interface"
import { IFaculty } from "./faculty.interface"

export interface IClazz {
    id: string
    name: string
    faculty: IFaculty
    academicYear: IAcademicYear
}

export interface IClazzQuery extends IBaseQuery {}

export interface IClazzByFacultyQuery {
    facultyId: string
}

export interface IClazzResponse extends IBaseRespone {
    data: IClazz[]
}

export interface IClazzCreate {
    name: string
    facultyId: string
    academicYearId: string
}

export interface IClazzDelete extends Pick<IClazz, "id"> {}

export interface IAcademicYear {
    id: string
    code: string
    name: string
    startYear: string
}

export interface IAcademicYearResponse extends IBaseRespone {
    data: IAcademicYear[]
}
