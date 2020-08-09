import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
  httpOptions: { headers; observe; } = {
    headers : new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    observe: 'response'
  };
  private api = 'http://localhost:8080/api';

  constructor(private readonly httpC: HttpClient, private router: Router ){}

  async get(inUrl: string): Promise<any> {
    const formedUrl = this.filterAccents(inUrl.split(' ').join('-'));
    return await new Promise((resolve, reject) => {
      this.httpC.get(`${this.api}${formedUrl}`)
        .subscribe( response => {
          try {
            resolve(response);
          } catch (error) {
            reject(response);
          }
        }, fail => {
          try {
            fail = fail.json();
          } catch (error) {}
          reject(fail);
        });
    });
  }
  async post(inUrl: string, query?: any): Promise<any> {
    console.log(query);
    return await new Promise((resolve, reject) => {
      this.httpC.post(`${this.api}${inUrl}`, query)
        .subscribe(response => {
          try {
            resolve(response);
          } catch (error) {
            reject(response);
          }
        }, fail => {
          console.log(fail);
          reject({
            status: fail.status,
            error: fail.error
            
          });
        });
    });
  }

  private filterAccents(value: string) {
    const accents = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    const original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (let i = 0; i < accents.length; i++) {
      value = value.replace(accents.charAt(i), original.charAt(i));
    }
    return value;
  }

}
