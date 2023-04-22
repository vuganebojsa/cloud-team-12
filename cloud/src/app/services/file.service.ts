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

  constructor(private http: HttpClient) { }


  uploadFile(fileInfo: FileInfo, file: any): Observable<void>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', fileInfo.type);
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    let options = { headers: headers };
    console.log(fileInfo);
    return this.http.put<void>(this.s3_bucket_path + fileInfo.filename, file, options);
  }
}
