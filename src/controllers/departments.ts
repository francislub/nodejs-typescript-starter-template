import { db } from "@/db/db";
import { DepartmentCreateProps, StreamCreateProps, TypedRequestBody } from "@/types/types";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createDepartment(req: TypedRequestBody<DepartmentCreateProps>, res: Response) {
  const data = req.body;
  const slug = generateSlug(data.name)
  data.slug = slug
  try {
    // Check if the class already exists\
    const existingDepartment = await db.department.findUnique({
      where: {
        slug,
      },
    });
    if (existingDepartment) {
      return res.status(409).json({
        data: null,
        error: "Department Already exists",
      });
    }
    const newDepartment = await db.department.create({
      data
    });
    console.log(
      `Department created successfully: ${newDepartment.name} (${newDepartment.id})`
    );
    return res.status(201).json({
      data: newDepartment,
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
export async function getDepartments(req: Request, res: Response) {
  try {
    const departments = await db.department.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
       teachers : true,
       subjects : true
      }
    });
    return res.status(200).json(departments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to fetch departments",
    })
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
