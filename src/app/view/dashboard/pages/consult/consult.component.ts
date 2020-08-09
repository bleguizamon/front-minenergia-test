import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PruebaService } from 'src/app/services/prueba.service';
import { FormControl, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';



@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {
  public contact: FormGroup;
  data : any;
  constructor(private router: ActivatedRoute, public api: PruebaService) { }

  ngOnInit(): void {
    this.contact = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      addresss : new FormControl(''),
      phones: new FormArray([new FormControl()]),
      photo: new FormControl(''),

    });
  }
  public consult(name){

    var url='/contacts/names?name='+name;
    
    this.api.get(url).then((result) => {
      this.data = result;
      console.log(this.data)
  
    }).catch(() => {

    });
  }


}
