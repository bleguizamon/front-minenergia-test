import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PruebaService } from 'src/app/services/prueba.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data : any;
  constructor(private router: ActivatedRoute, public api: PruebaService) { }

  ngOnInit(): void {
    this.consultTable();
  }

  private consultTable(){
    this.api.get('/account/contacts?id=1').then((result) => {
      this.data = result;
    }).catch(() => {

    });



  }
}
