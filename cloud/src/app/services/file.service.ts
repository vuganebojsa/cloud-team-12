import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { FileInfo } from '../models/FileInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDecoderService } from './token-decoder.service';
import { FolderInfo } from '../models/Folder';
import { Folder } from 'aws-sdk/clients/storagegateway';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  s3_bucket_path: string = ' https://0poeduyada.execute-api.eu-central-1.amazonaws.com/dev/post-file/';

  post_folder_path: string = 'https://0poeduyada.execute-api.eu-central-1.amazonaws.com/dev/post-folder-lambda';
  get_folders_path: string = 'https://0poeduyada.execute-api.eu-central-1.amazonaws.com/dev/get-folders/';
  post_folder_path_s3: string = 'https://0poeduyada.execute-api.eu-central-1.amazonaws.com/dev/post-folder-s3';

  dynamoPath: string = 'https://0poeduyada.execute-api.eu-central-1.amazonaws.com/dev/post-file-lambda';

  get_all_files_path: string = 'https://0poeduyada.execute-api.eu-central-1.amazonaws.com/dev/get-files/';
  get_file: string = 'https://0poeduyada.execute-api.eu-central-1.amazonaws.com/dev/get-file/';
  constructor(private http: HttpClient, private tokenDecoderService: TokenDecoderService) { 

  }

  getFolderName(type:string): string{
    let folder: string = '';
    return folder;
  }
  uploadFile(fileInfo: FileInfo, file: any): Observable<any>{
    console.log(fileInfo);
    console.log(file);
    return this.http.post<any>(this.s3_bucket_path + 'bivuja-bucket/' + fileInfo.filename, file);
  }
  postFolder(folder: FolderInfo): Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["username"];
    folder.username = username;
    return this.http.post<any>(this.post_folder_path, folder);
  }

  postFolderS3(path: string): Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["username"];
    path = username + '-' + path
    
    return this.http.post<any>(this.post_folder_path_s3, {path: path});
  }

  getFolders(): Observable<FolderInfo[]>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["username"];
    return this.http.get<FolderInfo[]>(this.get_folders_path + username);


  }


  uploadFileToDynamoDb(fileInfo: FileInfo): Observable<FileInfo>{
    let type = this.getFolderName(fileInfo.type);
    fileInfo.bucketName = 'bivuja-bucket';
    fileInfo.folderName = type;
    fileInfo.username = this.tokenDecoderService.getDecodedAccesToken()["username"];
    console.log(fileInfo);
    return this.http.post<FileInfo>(this.dynamoPath, fileInfo);
  }


  getFiles(): Observable<FileInfo[]>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["username"];
    let bucket = 'bivuja-bucket'
    return this.http.get<FileInfo[]>(this.get_all_files_path + bucket + '/' + username);

  }
  getFile(path:string){
    let username = this.tokenDecoderService.getDecodedAccesToken()["username"];
    // path = username + '-' + path;
    if(path.startsWith('/' + username)){
      path = path.slice(1, path.length);
      path = btoa(path);

    }else{

      path =  btoa( username + '-' + path);
    }
    return this.http.get(this.get_file + 'bivuja-bucket/' + path, {responseType: 'blob'});


  }
}
