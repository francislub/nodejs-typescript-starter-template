import { Request, Response } from 'express';
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

  export type StreamCreateProps ={
    title: string;
    slug: string;
    classId: string;
  }