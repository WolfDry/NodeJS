import { prisma } from "./prisma";

export function findPostByUser(userId: string){
    return prisma.post.findMany({
        where: {
            userId: userId
        }
    })
}

export function findPost(){
    return prisma.post.findMany()
}

export function createPost(content: string, userId: string){
    return prisma.post.create({
        data: {
            content,
            userId
        }
    })
}

// export function updateUser(id: string, name: string, email: string){
//     return prisma.user.update({
//         where: {
//             id
//         },
//         data: {
//             email,
//             name
//         }
//     })
// }

export function deletePost(id: string){
    return prisma.post.delete({
        where: {
            id
        }
    })
}