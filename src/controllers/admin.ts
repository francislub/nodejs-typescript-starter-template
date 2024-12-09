import { db } from "@/db/db";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createContact(req: Request, res: Response) {
  const { name, logo } = req.body;
  const slug = generateSlug(name);
  try {
    // Check if the school already exists\
    const existingContact = await db.school.findUnique({
      where: {
        slug,
      },
    });
    if (existingContact) {
      return res.status(409).json({
        data: null,
        error: "Contact with this name already exists",
      });
    }
    const newContact = await db.school.create({
      data: {
        name,
        slug,
        logo
      },
    });
    console.log(
      `School created successfully: ${newContact.name} (${newContact.id})`
    );
    return res.status(201).json({
      data: newContact,
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
export async function getContacts(req: Request, res: Response) {
  try {
    const contacts = await db.school.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(contacts);
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
