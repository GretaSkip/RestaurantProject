import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }


public getMenius(): Observable<Restaurant[]> {
  return this.http.get<Restaurant[]>("https://localhost:44321/Restaurant");
}

public addMeniu(restaurant: Restaurant):Observable<number> {
  return this.http.post<number>("https://localhost:44321/Restaurant", restaurant);
}

public deleteMeniu(id: number): Observable<Restaurant> {
  return this.http.delete<Restaurant>(`https://localhost:44321/Restaurant/${id}`);
}

public updateMeniu(restaurant: Restaurant): Observable<Restaurant> {
  return this.http.put<Restaurant>(`${"https://localhost:44321/Restaurant"}/${restaurant.id}`, restaurant);
}
 
}
