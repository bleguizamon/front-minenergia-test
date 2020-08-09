import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data : any;
  constructor(private router: ActivatedRoute, public api: PruebaService) { }

  ngOnInit(): void {
    this.consultProfile();
  }

  private consultProfile(){
    this.api.get('/account').then((result) => {
      this.data = result;
      console.log(this.data);
    }).catch(() => {

    });

}
}