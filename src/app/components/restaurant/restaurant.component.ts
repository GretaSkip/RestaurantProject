import { Component, OnInit } from '@angular/core';
import { Meniu } from 'src/app/models/meniu';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  private restaurantService: RestaurantService;

  constructor(restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
   }

  public id: number = 0;
  public title: string = "";
  public customers: number = 0;
  public employees: number = 0;
  public meniuId: number = 0;
  
  public restaurants: Restaurant[] = [];

  ngOnInit(): void {
    this.restaurantService.getMenius().subscribe((restaurantsFromApi) => {
      this.restaurants = restaurantsFromApi;
    })
  }

}
