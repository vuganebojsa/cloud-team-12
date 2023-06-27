import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-confirm-invite',
  templateUrl: './confirm-invite.component.html',
  styleUrls: ['./confirm-invite.component.css']
})
export class ConfirmInviteComponent {

  uploadForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email])
  });




  constructor(
    private fileService: FileService){

  }


  ngOnInit(): void {
    
  }

  declineInvite():void{
    if(!this.uploadForm.valid){
      alert('Please enter a valid email address.')
      return;

    }
    this.fileService.confirmInviteFromFamilyMember(this.uploadForm.value.email, 'declined').subscribe({
      next:(result) =>{
        
        alert('Successfully declined family member invitation: ' + this.uploadForm.value.email);
      },
      error:(err) =>{
        if(err.status === 0 || err.status === 200){
          alert('Successfully declined family member invitation: ' + this.uploadForm.value.email);
        }
      }
    })
  }
  acceptInvite():void{
    if(!this.uploadForm.valid){
      alert('Please enter a valid email address.')
      return;

    }
    this.fileService.confirmInviteFromFamilyMember(this.uploadForm.value.email, 'accepted').subscribe({
      next:(result) =>{
        
        alert('Successfully accepted family member invitation: ' + this.uploadForm.value.email);
      },
      error:(err) =>{
        if(err.status === 0 || err.status === 200){
          alert('Successfully accepted family member invitation: ' + this.uploadForm.value.email);
        }
      }
    })
  
  }
}
