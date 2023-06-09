import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { FileInfo } from '../models/FileInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDecoderService } from './token-decoder.service';
import { FolderInfo } from '../models/Folder';
import { Folder } from 'aws-sdk/clients/storagegateway';
import { SharedFile } from '../models/SharedFile';
import { InviteUser, User } from '../models/user';
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
  family_registration_invite_path:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/send-invite/';
  confirm_decline_invite_path:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/confirm-decline-invitation';
  register_from_invite_path: string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/register-from-invite';


  delete_file_overall_path:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/delete-file-overall/';
  post_file_overall_path:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/add-file-overall/';
  post_folder_overal_path:string = 'https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/post-folder-overall';
  /*
  DELETE - https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/delete-file-from-dynamo/{bucket}/{username}/{filename}/{id}
  POST - https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/add-file-overall/{bucket}/{filename}
  POST - https://zsgxz7y3p6.execute-api.eu-central-1.amazonaws.com/dev/post-folder-overall */
  constructor(private http: HttpClient, private tokenDecoderService: TokenDecoderService) { 

  }
  private base64File: string;

  addFileOverall(fileInfo: FileInfo):Observable<any>{
    let bucket_name:string = 'bivuja-bucket';
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    let filename = fileInfo.filename;
   
    fileInfo.bucketName = bucket_name;
    if(fileInfo.folderName !== ''){
      filename =  btoa(username + '-' + fileInfo.folderName + '/' + fileInfo.filename);
    }else{
      filename = btoa(username + '-' + filename);
    }
    fileInfo.username = username;

    return this.http.post<any>(this.post_file_overall_path + bucket_name + '/' + filename, fileInfo);
  }

  addFolderOverall(folderInfo: FolderInfo):Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    folderInfo.username = username;
    return this.http.post<any>(this.post_folder_overal_path, folderInfo);
  }

  
  deleteFileOverall(fileInfo: FileInfo):Observable<any>{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    let filename = fileInfo.filename;
    if(fileInfo.folderName !== ''){
      if(!fileInfo.folderName.endsWith('/')) fileInfo.folderName += '/';
      fileInfo.username = username;
      filename =  btoa(fileInfo.username + '-' + fileInfo.folderName + fileInfo.filename);
    }else{
      filename = btoa(filename);
    }
    let bucket_name:string = 'bivuja-bucket'
    return this.http.delete<any>(this.delete_file_overall_path + bucket_name + '/' + username + '/' + filename + '/' + fileInfo.id);
  }

  getFolderName(type:string): string{
    let folder: string = '';
    return folder;
  }


  registerFromInvite(user:InviteUser): Observable<any>{
    return this.http.post<any>(this.register_from_invite_path, user);

  }
  confirmInviteFromFamilyMember(email:string, status:string): Observable<any>{
    let inviterEmail = this.tokenDecoderService.getDecodedAccesToken()["email"];

    return this.http.post<any>(this.confirm_decline_invite_path, {
      'inviterEmail':inviterEmail,
      'familyEmail':email,
      'status':status
    });
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

}
