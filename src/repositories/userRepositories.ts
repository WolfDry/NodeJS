import { prisma } from "./prisma";

export function findUserByEmail(email: string){
    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export function findUserById(id: string){
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}

export function createUser(email: string, name: string){
    return prisma.user.create({
        data: {
            email,
            name
        }
    })
}

export function updateUser(id: string, name: string, email: string){
    return prisma.user.update({
        where: {
            id
        },
        data: {
            email,
            name
        }
    })
}

export function deleteUser(id: string){
    return prisma.user.delete({
        where: {
            id
        }
    })
}