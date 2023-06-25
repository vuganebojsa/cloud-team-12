export interface FileInfo{
    id?:string,
    filename: string,
    description: string,
    tags: string,
    type: string,
    size: string,
    createdAt: string,
    lastModifiedAt: string,
    username?:string,
    bucketName?:string,
    folderName?:string,
    newPathName?:string,
    fileContent?:string
}
