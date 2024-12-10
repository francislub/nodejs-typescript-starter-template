import { db } from "@/db/db";
import { ContactProps, TypedRequestBody } from "@/types/types";
import { Request, Response } from "express";

export async function createContact(req: TypedRequestBody<ContactProps>, res: Response) {
  const data = req.body;
  const {email, school } = data;
  try {
    // Check if the contact already exists\
    const existingEmail = await db.contact.findUnique({
      where: {
        email,
      },
    });
    const existingSchool = await db.contact.findUnique({
      where: {
        school,
      },
    });
    if (existingSchool || existingEmail) {
      return res.status(409).json({
        data: null,
        error: "We have already recieved a request for this school or email",
      });
    }
    const newContact = await db.contact.create({
      data
    });
    console.log(
      `Cantact created successfully: ${newContact.school} (${newContact.id})`
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
    const contacts = await db.contact.findMany({
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
