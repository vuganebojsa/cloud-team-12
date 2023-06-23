import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { FileInfo } from '../models/FileInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDecoderService } from './token-decoder.service';
import { FolderInfo } from '../models/Folder';
import { Folder } from 'aws-sdk/clients/storagegateway';
import { SharedFile } from '../models/SharedFile';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  s3_bucket_path: string = ' https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/post-file/';

  post_folder_path: string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/post-folder-lambda';
  get_folders_path: string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/get-folders/';
  post_folder_path_s3: string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/post-folder-s3';
  post_file_to_folder_path: string = ' https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/post-file-to-folder/';
  dynamoPath: string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/post-file-lambda';

  get_all_files_path: string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/get-files/';
  get_file: string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/get-file/';
  delete_dynamo_path:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/delete-file-from-dynamo/';
  delete_s3_path:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/delete-file-from-bucket/';
  get_shared_files:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/get-shared-files/';
  share_file:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/share-file';
  stop_share_file:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/stop-share-file/';
  get_my_shared_files_info:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/get-my-shared-files-info/';
  move_file_path:string = ' https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/move-file';
  family_registration_invite_path:string = '';
  constructor(private http: HttpClient, private tokenDecoderService: TokenDecoderService) { 

  }
  private base64File: string;


  getFolderName(type:string): string{
    let folder: string = '';
    return folder;
  }
  uploadFileToFolder(fileInfo: FileInfo, file: any): Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    fileInfo.username = username;
    fileInfo.filename =  btoa(fileInfo.username + '-' + fileInfo.folderName + fileInfo.filename);
    return this.http.post<any>(this.post_file_to_folder_path + 'bivuja-bucket/' + fileInfo.filename, file);
  }
  uploadFile(fileInfo: FileInfo, file: any): Observable<any>{
    return this.http.post<any>(this.s3_bucket_path + 'bivuja-bucket/' + fileInfo.filename, file);
  }


  moveFile(fileInfo: FileInfo): Observable<any>{
    return this.http.post<any>(this.move_file_path, fileInfo);
  }
  sendInvitationToFamilyMember(email:string): Observable<any>{
    let inviterEmail = this.tokenDecoderService.getDecodedAccesToken()["email"];

    return this.http.post<any>(this.family_registration_invite_path, {
      'inviter':inviterEmail,
      'familyMember':email
    });
  }
  postFolder(folder: FolderInfo): Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    folder.username = username;
    return this.http.post<any>(this.post_folder_path, folder);
  }

  postFolderS3(path: string): Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    path = username + '-' + path
    
    return this.http.post<any>(this.post_folder_path_s3, {path: path});
  }

  getFolders(): Observable<FolderInfo[]>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    return this.http.get<FolderInfo[]>(this.get_folders_path + username);


  }
  getSharedFiles(): Observable<FileInfo[]>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    return this.http.get<FileInfo[]>(this.get_shared_files + username);


  }
  getMySharedFilesInfo(): Observable<SharedFile[]>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    return this.http.get<SharedFile[]>(this.get_my_shared_files_info + username);


  }
  shareFile(sharedFile: SharedFile): Observable<any>{
    
    sharedFile.giver = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    
    return this.http.post<any>(this.share_file, sharedFile);
  }
  stopShareFile(file_id:string): Observable<any>{
      
    return this.http.delete<any>(this.stop_share_file + file_id);
  }
  uploadFileToDynamoDb(fileInfo: FileInfo): Observable<FileInfo>{
    
    fileInfo.bucketName = 'bivuja-bucket';
    if(fileInfo.folderName === undefined || fileInfo.folderName === null) fileInfo.folderName = ''; 
    fileInfo.username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    console.log(fileInfo);
    return this.http.post<FileInfo>(this.dynamoPath, fileInfo);
  }


  getFiles(): Observable<FileInfo[]>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    let bucket = 'bivuja-bucket'
    return this.http.get<FileInfo[]>(this.get_all_files_path + bucket + '/' + username);

  }
  getFile(path:string){
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    // path = username + '-' + path;
    if(path.startsWith('/' + username)){
      path = path.slice(1, path.length);
      path = btoa(path);

    }else{

      path =  btoa( username + '-' + path);
    }
    return this.http.get(this.get_file + 'bivuja-bucket/' + path, {responseType: 'blob'});

  }

  downloadSharedFile(path:string){
    return this.http.get(this.get_file + 'bivuja-bucket/' + path, {responseType: 'blob'});

  }

  deleteFileS3(fileInfo:FileInfo): Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    let bucket = 'bivuja-bucket'
    let filename = fileInfo.filename;
    if(fileInfo.folderName !== ''){
      if(!fileInfo.folderName.endsWith('/')) fileInfo.folderName += '/';
      fileInfo.username = username;
      filename =  btoa(fileInfo.username + '-' + fileInfo.folderName + fileInfo.filename);
    }else{
      filename = btoa(filename);
    }
    return this.http.delete<any>(this.delete_s3_path + bucket + '/' + filename + '/' + fileInfo.id);

  }
  deleteFileDynamo(file:FileInfo): Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    let bucket = 'bivuja-bucket'

    return this.http.delete<any>(this.delete_dynamo_path + bucket + '/' + username + '/' + file.id);

  }
}
