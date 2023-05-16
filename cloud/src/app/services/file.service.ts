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
    return folder;
  }
  uploadFile(fileInfo: FileInfo, file: any): Observable<any>{
    console.log(fileInfo);
    console.log(file);
    return this.http.put<any>(this.s3_bucket_path + fileInfo.filename, file);
  }

  uploadFileToDynamoDb(fileInfo: FileInfo): Observable<FileInfo>{
    let type = this.getFolderName(fileInfo.type);
    fileInfo.bucketName = 'bivuja-bucket';
    fileInfo.folderName = type;
    console.log(this.tokenDecoderService.getDecodedAccesToken);
    fileInfo.username = this.tokenDecoderService.getDecodedAccesToken["username"];
    console.log(fileInfo);
    return this.http.post<FileInfo>(this.dynamoPath, fileInfo);
  }
}
