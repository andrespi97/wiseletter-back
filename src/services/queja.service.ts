import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Queja, PrismaClient, User } from "@prisma/client";
//const prisma = new PrismaClient()

export class QuejaService {
  static async getById(id: number) {
    const findQueja = await prisma.queja.findUnique({ where: { id } });
    if (!findQueja) throw new HttpException(404, "Offer not found");
    return findQueja;
  }

  // localhost:3000/api/queja/?title=dam
  static async getAll(title: string = "") {
    /*  return await prisma.offer.findMany({
            where: title ? {
                title: {
                    contains: title
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        }) */

    return await prisma.queja.findMany({
      where: {
        ...(title && {
          title: {
            contains: title,
            //mode: "insensitive" // Búsqueda sin distinción entre mayúsculas y minúsculas
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,

    });
  }
  static async getFromUser(idUser: number, title: string = "") {


    return await prisma.queja.findMany({
      where: {
        idUserCreator: idUser,
        ...(title && {
          title: {
            contains: title,
            //mode: "insensitive" // Búsqueda sin distinción entre mayúsculas y minúsculas
          },
        }),

      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,

    });
  }
  static async create(idUser: number, queja: Omit<Queja, "categories"> & { categories?: number[] }) {
    console.log("creando", idUser);
    return await prisma.queja.create({
      data: {
        ...queja,
        idUserCreator: idUser,
      },
    });
  }

  static async update(id: number, queja: Omit<Queja, "categories"> & { categories?: number[] }) {
    const findQueja = await prisma.queja.findUnique({ where: { id } });
    if (!findQueja) throw new HttpException(404, "Queja doesnt exists");
    return await prisma.queja.update({
      where: { id },
      data: {
        ...queja,
      },
    });
  }

  static async delete(id: number) {
    try {
      return await prisma.queja.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(404, "Queja not found");
    }
  }
}
