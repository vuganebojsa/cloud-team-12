import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { FileInfo } from '../models/FileInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDecoderService } from './token-decoder.service';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  s3_bucket_path: string = 'https://cngfolor3e.execute-api.eu-central-1.amazonaws.com/dev/bivuja-bucket/';
  dynamoPath: string = 'https://cngfolor3e.execute-api.eu-central-1.amazonaws.com/dev/files';

  constructor(private http: HttpClient, private tokenDecoderService: TokenDecoderService) { 

  }

  getFolderName(type:string): string{
    let folder: string = '';
    if(type.toLowerCase().includes("image")) folder = 'photos';
    else if(type.toLowerCase().includes("text")) folder = 'text';
    else if(type.toLowerCase().includes("audio")) folder = 'audio';
    else if(type.toLowerCase().includes("video")) folder = 'videos';
    else folder = 'other';
    return folder;
  }
  uploadFile(fileInfo: FileInfo, file: any): Observable<any>{
    let type = this.getFolderName(fileInfo.type);
    fileInfo.username = this.tokenDecoderService.getDecodedAccesToken["username"];
    return this.http.put<any>(this.s3_bucket_path + type + "/" + fileInfo.filename, file);
  }

  uploadFileToDynamoDb(fileInfo: FileInfo): Observable<FileInfo>{
    let type = this.getFolderName(fileInfo.type);
    fileInfo.bucketName = 'bivuja-bucket';
    fileInfo.folderName = type;
    fileInfo.username = this.tokenDecoderService.getDecodedAccesToken["username"];
    console.log(fileInfo);
    return this.http.post<FileInfo>(this.dynamoPath, fileInfo);
  }
}
