export interface FileInfo{
    id?:number,
    filename: string,
    description: string,
    tags: string,
    type: string,
    size: string,
    createdAt: string,
    lastModifiedAt: string,
    username?:string,
    bucketName?:string,
    folderName?:string
}