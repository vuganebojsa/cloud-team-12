export interface FileInfo{
    id?:number,
    filename: string,
    description: string,
    tags: string,
    type: string,
    size: number,
    createdAt: string,
    lastModifiedAt: string,
    username?:string,
    bucketName?:string,
    folderName?:string
}