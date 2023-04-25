import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { FileInfo } from '../models/FileInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  s3_bucket_path: string = 'https://cngfolor3e.execute-api.eu-central-1.amazonaws.com/dev/bivuja-bucket/';
  private params = {
    TableName: 'Files'
  };
  private dynamodb;
  private docClient;
  constructor(private http: HttpClient) { 

    this.dynamodb = new AWS.DynamoDB();
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }


  uploadFile(fileInfo: FileInfo, file: any): Observable<any>{
    let type: string = '';
    if(fileInfo.type.toLowerCase().includes("image")) type = 'photos';
    else if(fileInfo.type.toLowerCase().includes("text")) type = 'text';
    else if(fileInfo.type.toLowerCase().includes("audio")) type = 'audio';
    else if(fileInfo.type.toLowerCase().includes("video")) type = 'videos';
    else type = 'other';

    return this.http.put<any>(this.s3_bucket_path + type + "/" + fileInfo.filename, file);
  }
}
