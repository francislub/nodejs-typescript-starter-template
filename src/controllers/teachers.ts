import { db } from "@/db/db";
import { TeacherCreateProps, TypedRequestBody } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { Request, Response } from "express";

export async function createTeacher(req: TypedRequestBody<TeacherCreateProps>, res: Response) {
  const data = req.body;
  const {NIN, phone, email, dateOfBirth, dateOfJoining } = data;
  data.dateOfBirth = convertDateToIso(dateOfBirth)
  data.dateOfJoining = convertDateToIso(dateOfJoining)
  try {
    // Check if the information already exists\
    const existingEmail = await db.teacher.findUnique({
      where: {
        email,
      },
    });
    const existingNIN = await db.teacher.findUnique({
      where: {
        NIN,
      },
    });
    const existingPhone = await db.teacher.findUnique({
      where: {
        phone,
      },
    });
    if (existingNIN) {
      return res.status(409).json({
        data: null,
        error: "Teacher with this NIN already exists",
      });
    }
    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "Teacher with this Email Already Exists",
      });
    }
    if (existingPhone) {
      return res.status(409).json({
        data: null,
        error: "Teacher with this phone Number Already Exists",
      });
    }
    const newTeacher = await db.teacher.create({
      data
    });
    console.log(
      `Teacher created successfully: ${newTeacher.firstName} (${newTeacher.id})`
    );
    return res.status(201).json({
      data: newTeacher,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}
export async function getTeachers(req: Request, res: Response) {
  try {
    const teachers = await db.teacher.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(teachers);
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
