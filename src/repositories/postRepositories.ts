import { prisma } from "./prisma";

export function findPostByUser(userId: string){
    return prisma.post.findMany({
        where: {
            userId: userId
        }
    })
}

export function findPost(){
    return prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export function findLastPostByUser(userId: string){
    return prisma.post.findFirst({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export function createPost(content: string, userId: string){
    return prisma.post.create({
        data: {
            content,
            userId
        }
    })
}

export function deletePost(id: string){
    return prisma.post.delete({
        where: {
            id
        }
    })
}