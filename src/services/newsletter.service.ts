import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Newsletter, PrismaClient, User } from "@prisma/client";
//const prisma = new PrismaClient()

export class NewsletterService {
  static async getById(id: number) {
    const findNewsletter = await prisma.newsletter.findUnique({ where: { id } });
    if (!findNewsletter) throw new HttpException(404, "Offer not found");
    return findNewsletter;
  }

  // localhost:3000/api/newsletter/?title=dam
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

    return await prisma.newsletter.findMany({
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
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  static async create(idUser: number, newsletter: Newsletter) {
    console.log("creando", idUser);
    return await prisma.newsletter.create({
      data: {
        ...newsletter,
        idUserCreator: idUser,
      },
    });
  }

  static async update(id: number, newsletter: Newsletter) {
    const findNewsletter = await prisma.newsletter.findUnique({ where: { id } });
    if (!findNewsletter) throw new HttpException(404, "Newsletter doesnt exists");
    return await prisma.newsletter.update({
      where: { id },
      data: {
        ...newsletter,
      },
    });
  }

  static async delete(id: number) {
    try {
      return await prisma.newsletter.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(404, "Newsletter not found");
    }
  }

  static async rate(
    idUser: number,
    idNewsletter: number,
    value: number
  ): Promise<void> {
    // Validar que el rating está dentro del rango permitido
    if (value < 0 || value > 5) {
      throw new Error("Rating must be between 0 and 5.");
    }

    // Verificar si la oferta existe
    const newsletter = await prisma.newsletter.findUnique({ where: { id: idNewsletter } });
    if (!newsletter) {
      throw new Error("Newsletter not found.");
    }

    // Actualizar o crear la calificación

    /*
        SELECT  AVG(value) AS averageValue, COUNT(value) AS totalCount
    FROM Rating
    WHERE offerId = <offerId>;
        */
    await prisma.rate.upsert({
      where: { idUser_idNewsletter: { idUser, idNewsletter } },
      update: { value },
      create: { idUser, idNewsletter, value },
    });
  }

  static async getRate(idNewsletter: number) {
    const ratingStats = await prisma.rate.aggregate({
      where: { idNewsletter },
      _avg: { value: true }, // Calcular el promedio
      _count: { value: true }, // Contar el total de calificaciones
    });
    return {
      totalRatings: ratingStats._count.value || 0,
      averageRating: ratingStats._avg.value?.toFixed(2) || 0,
    };
  }

  static async getMyRate(idUser: number, idNewsletter: number) {
    return await prisma.rate.findUnique({
      where: { idUser_idNewsletter: { idUser, idNewsletter } },
    });
  }
}
