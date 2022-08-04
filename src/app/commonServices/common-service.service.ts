import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor( private http:HttpClient) { }
  
  login(data:any){
      return this.http.post(environment.baseUrl +'login',data)
  }
  register(data:any){
    return this.http.post(environment.baseUrl +'register',data)
  }
  getShipments(id:any,header:any){
  return  this.http.get(`${environment.baseUrl}my-shipments/${id}`,{headers:header})
  }
  getAuthentication(data:any){
    return  this.http.post(`${environment.baseUrl}Authentication/`,data)
    }
  createShipments(data:any,header:any){
    return  this.http.post(`${environment.baseUrl}estimate`,data,{headers:header})
    }
    createFinalShipment(data:any,header:any){
      return  this.http.post(`${environment.baseUrl}shipping`,data,{headers:header})
    }
}
