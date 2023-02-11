import { Post } from "@prisma/client";
import { prisma } from "./prisma";

export function findUserByEmail(email: string){
    return prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            posts: true
        }
    })
}

export function findUserById(id: string){
    return prisma.user.findUnique({
        where: {
            id
        },
        include: {
            posts: true
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

export function updatePostsAndUser(idPost: string, isUser: string){
    return prisma.user.update({
        where: {
            id: isUser
        },
        data: {
            posts: {
                connect: {
                    id: idPost
                }
            }
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