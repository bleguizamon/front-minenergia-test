import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, NgForm, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PruebaService } from 'src/app/services/prueba.service';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public contact: FormGroup;
  public image: any;
  public uploadPotho: boolean;
  registerContact: any;
  success: boolean;
  item: any;
  contacts: any;

  constructor(private route: Router, private router: ActivatedRoute, public api: PruebaService, private registerService: RegisterService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.success = false;
    this.router.data.subscribe(({ item }) => {
      this.item = item ? item : null;

    });


    this.contact = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      address: new FormControl(''),
      photo: new FormControl(''),
      user: new FormControl({ 'id': 1 }),
      phones: new FormArray(!this.item ? [new FormControl()] : [])
    });


    if (this.item != null) {
      console.log("entro if");
      this.api.get('/contacts?id=' + this.item).then((result) => {
        this.contact.patchValue({
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          address: result.address,
          photo: result.photo,
          phones: result.phones,
          user: result.user
        });

        for (let index = 0; index < result.phones.length; index++) {
          const element = result.phones[index];

          const control = <FormArray>this.contact.controls['phones'];
          control.push(new FormControl(element));

        }

      }).catch(() => {
        // alert('Intenta nuevamente en unos momentos');
      });
    }


  }

  public createUser() {

    this.contact.get('photo').setValue(this.image);

    if (this.item != null) {
      this.api.post('/contacts', this.contact.value)
    } else {
      this.api.post('/contacts/news', this.contact.value)

    }

    this.route.navigate([`/dashboard`]);
  }

  public uploadPhoto(files: any) {
    console.log('click');
    const fileData = files.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = () => {
      this.image = reader.result;
      this.contact.get('photo').setValue(event);
      this.uploadPotho = true;
    };
  }


  get getPhones() {

    return this.contact.get('phones') as FormArray;

  }

  addPhone() {
    const control = <FormArray>this.contact.controls['phones'];
    control.push(new FormControl);
  }
}
