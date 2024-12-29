import { db } from "@/db/db";
import { ClassCreateProps, StreamCreateProps, TypedRequestBody } from "@/types/types";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createClass(req: TypedRequestBody<ClassCreateProps>, res: Response) {
  const data = req.body;
  const slug = generateSlug(data.title)
  data.slug = slug
  try {
    // Check if the class already exists\
    const existingClass = await db.class.findUnique({
      where: {
        slug,
      },
    });
    if (existingClass) {
      return res.status(409).json({
        data: null,
        error: "Class Already exists",
      });
    }
    const newClass = await db.class.create({
      data
    });
    console.log(
      `Class created successfully: ${newClass.title} (${newClass.id})`
    );
    return res.status(201).json({
      data: newClass,
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
export async function createStream(req: TypedRequestBody<StreamCreateProps>, res: Response) {
  const data = req.body;
  const slug = generateSlug(data.title)
  data.slug = slug
  try {
    // Check if the stream already exists\
    const existingStream = await db.stream.findUnique({
      where: {
        slug,
      },
    });
    if (existingStream) {
      return res.status(409).json({
        data: null,
        error: "Stream Already exists",
      });
    }
    const newStream = await db.stream.create({
      data
    });
    console.log(
      `Stream created successfully: ${newStream.title} (${newStream.id})`
    );
    return res.status(201).json({
      data: newStream,
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
export async function getClasses(req: Request, res: Response) {
  try {
    const classes = await db.class.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        streams: {
          include: {
            _count:{
              select: {
                students: true
              }
            }
          }
        },
        _count:{
          select: {
            students: true
          }
        }
      }
    });
    return res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to fetch classes",
    })
  }
}

export async function getBriefClasses(req: Request, res: Response) {
  try {
    const classes = await db.class.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
         id: true,
         title: true
      }
    });
    return res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to fetch classes",
    })
  }
}

export async function getStreams(req: Request, res: Response) {
  try {
    const streams = await db.stream.findMany({
      orderBy: {
        createdAt: "desc",
      },
      
    });
    return res.status(200).json(streams);
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
