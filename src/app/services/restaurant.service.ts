import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { RestaurantCreateEdit } from '../models/restaurantCreateEdit';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }


public getRestaurants(): Observable<Restaurant[]> {
  return this.http.get<Restaurant[]>("https://localhost:44321/Restaurant");
}

public getRestaurantsByMeniu(meniuId: number): Observable<Restaurant[]> {
  return this.http.get<Restaurant[]>(`https://localhost:44321/Restaurant/RestaurantsbyMeniu/${meniuId}`);
}

public addRestaurant(restaurant: RestaurantCreateEdit):Observable<number> {
  return this.http.post<number>("https://localhost:44321/Restaurant", restaurant);
}

public deleteRestaurant(id: number): Observable<Restaurant> {
  return this.http.delete<Restaurant>(`https://localhost:44321/Restaurant/${id}`);
}

public updateRestaurant(restaurant: RestaurantCreateEdit): Observable<Restaurant> {
  return this.http.put<Restaurant>(`https://localhost:44321/Restaurant`, restaurant);
}
 
}
