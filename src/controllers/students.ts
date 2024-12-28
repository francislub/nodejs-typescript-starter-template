import { db } from "@/db/db";
import { ContactProps, ParentCreateProps, StudentCreateProps, TypedRequestBody } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { Request, Response } from "express";

export async function createStudent(req: TypedRequestBody<StudentCreateProps>, res: Response) {
  const data = req.body;
  const {BCN, regNo, email, rollNo,  dob ,admissionDate} = data;
  data.dob = convertDateToIso(dob)
  data.admissionDate = convertDateToIso(admissionDate)
  try {
    // Check if the information already exists\
    const existingEmail = await db.student.findUnique({
      where: {
        email,
      },
    });
    const existingBCN = await db.student.findUnique({
      where: {
        BCN,
      },
    });
    const existingRegNo = await db.student.findUnique({
      where: {
        regNo,
      },
    });
    const existingRollNo = await db.student.findUnique({
      where: {
        rollNo,
      },
    });
    if (existingBCN) {
      return res.status(409).json({
        data: null,
        error: "Student with this Birth Certificate already exists",
      });
    }
    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "Student with this Email Already Exists",
      });
    }
    if (existingRegNo) {
      return res.status(409).json({
        data: null,
        error: "Student with this Registration Number Already Exists",
      });
    }
    if (existingRollNo) {
      return res.status(409).json({
        data: null,
        error: "Student with this Roll Number Already Exists",
      });
    }
    const newStudent = await db.student.create({
      data,
    });
    console.log(
      `Student created successfully: ${newStudent.firstName} (${newStudent.id})`
    );
    // console.log("NewStudent: ", newStudent);
    return res.status(201).json({
      data: newStudent,
      error: null,
    });
    // console.log("Result: ", result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}
export async function getStudents(req: Request, res: Response) {
  try {
    const students = await db.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
  }
}
export async function getNextStudentSquence(req: Request, res: Response) {
  try {
    const lastStudent = await db.student.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    //BU/UG/2024/0001
    const stringSeq = lastStudent?.regNo.split("/")[3];
    const lastSeq = stringSeq ? parseInt(stringSeq) : 0;
    const nextSeq =  lastSeq + 1;
    return res.status(200).json(nextSeq);
  } catch (error) {
    console.log(error);
  }
}
// export async function getCustomerById(req: Request, res: Response) {
//   const { id } = req.params;
//   try {
//     const customer = await db.customer.findUnique({
//       where: {
//         id,
//       },
//     });
//     return res.status(200).json(customer);
//   } catch (error) {
//     console.log(error);
//   }
// }
