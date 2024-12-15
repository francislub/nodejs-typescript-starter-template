import { db } from "@/db/db";
import { ContactProps, ParentCreateProps, TypedRequestBody } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { Request, Response } from "express";

export async function createParent(req: TypedRequestBody<ParentCreateProps>, res: Response) {
  const data = req.body;
  const {NIN, phone, email, dob } = data;
  data.dob = convertDateToIso(dob)
  try {
    // Check if the information already exists\
    const existingEmail = await db.parent.findFirst({
      where: {
        email,
      },
    });
    const existingNIN = await db.parent.findFirst({
      where: {
        NIN,
      },
    });
    const existingPhone = await db.parent.findFirst({
      where: {
        phone,
      },
    });
    if (existingNIN) {
      return res.status(409).json({
        data: null,
        error: "Parent with this NIN already exists",
      });
    }
    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "Parent with this Email Already Exists",
      });
    }
    if (existingPhone) {
      return res.status(409).json({
        data: null,
        error: "Parent with this phone Number Already Exists",
      });
    }
    const newParent = await db.parent.create({
      data
    });
    console.log(
      `Parent created successfully: ${newParent.firstName} (${newParent.id})`
    );
    return res.status(201).json({
      data: newParent,
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
export async function getParents(req: Request, res: Response) {
  try {
    const parents = await db.parent.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(parents);
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
