import { Request, Response } from 'express';
import { Gender, SubjectCategory, SubjectType } from '@prisma/client';
export interface TypedRequestBody<T> extends Request {
    body: T;
}
export type ContactProps = {
    fullname: string;
    email: string;
    phone: string;
    school: string;
    country: string;
    schoolPage: string;
    students: number;
    role: string;
    media: string;
    message: string;
  };

  export type ClassCreateProps ={
    title: string;
    slug: string;
  };

  export type DepartmentCreateProps ={
    name: string;
    slug: string;
  };

  export type SubjectCreateProps ={
    name: string;
    slug: string;
    code: string;
    shortName: string;
    category: SubjectCategory;
    type: SubjectType;
    departmentId: string;
    departmentName: string;
  };

  export type StreamCreateProps ={
    title: string;
    slug: string;
    classId: string;
  }
  export type ParentCreateProps = {
    title:string;
    firstName:string,
    lastName:string,
    relationship:string,
    email:string,
    NIN:string,
    gender:string,
    dob:string,
    phone:string,
    nationality:string,
    whatsapNo:string,
    contactMethod:string,
    occupation:string,
    address:string,
    password:string,
    imageUrl:string,
  };

  export type StudentCreateProps = {
    name:string;
    firstName:string;
    lastName:string;
    email:string;
    parentId:string;
    classId:string;
    streamId:string;
    parentName?:string;
    classTitle?:string;
    streamTitle?:string;
    password:string;
    imageUrl:string;
    phone:string;
    state:string;
    BCN:string;
    religion:string;
    gender:string;
    nationality:string;
    dob:string;
    rollNo:string;
    regNo:string;
    admissionDate:string;
    address:string;
  };

  export type TeacherCreateProps = {
    title:string;
    employeeId:string;
    firstName:string,
    lastName:string,
    phone:string,
    email:string,
    whatsappNo:string,
    nationality:string,
    NIN:string,
    gender:Gender,
    dateOfBirth:string,
    contactMethod:string,
    password:string,
    dateOfJoining:string,
    designation:string,
    departmentId:string,
    departmentName:string,
    qualification:string,
    mainSubject:string,
    mainSubjectId:string,
    subjects:string[],
    classIds:string[],
    classes:string[],
    experience:number,
    address:string,
    imageUrl:string,
  }