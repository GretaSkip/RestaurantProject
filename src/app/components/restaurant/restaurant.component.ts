import { Component, OnInit } from '@angular/core';
import { Restaurant, Meniu } from 'src/app/models/restaurant';
import { RestaurantCreateEdit } from 'src/app/models/restaurantCreateEdit';
import { MeniuService } from 'src/app/services/meniu.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  private restaurantService: RestaurantService;
  private meniuService: MeniuService;
  

  constructor(restaurantService: RestaurantService, meniuService: MeniuService) {
    this.restaurantService = restaurantService;
    this.meniuService = meniuService;
   }

  public id: number ;
  public title: string;
  public customers: number;
  public employees: number;
  public meniuId: number;
  
  public meniuSelected: number;
  
  public restaurants: Restaurant[] = [];
  public valueCreated: RestaurantCreateEdit[] = [];
  public menius: Meniu[] = [];

  public hideMode: boolean = true;
  public editMode: boolean = false;

  ngOnInit(): void {
    this.getData();
    this.getMeniusData();
  }

  public getData(): void{
    this.restaurantService.getRestaurants().subscribe((restaurantsFromApi) => {
      this.restaurants = restaurantsFromApi;
    })
  }

  public getMeniusData(): void{
    this.meniuService.getMenius().subscribe((meniusFromApi) => {
      this.menius = meniusFromApi.sort((a, b) => (a.title > b.title) ? 1 : -1);
    })
  }

  menuUpdated(value: string): void {
    this.getMeniusData();
  }

  public onMeniuSelected(selectedMeniuId: number): void{
    if(selectedMeniuId == 0){
      this.getData();
    }
    this.restaurantService.getRestaurantsByMeniu(selectedMeniuId).subscribe((restaurantsFromApi) => {
      this.restaurants = restaurantsFromApi;
    })
  }

  public addRestaurant(): void{
    var newRestaurant: RestaurantCreateEdit = {
      id: this.id,
      title: this.title,
      customers: this.customers,
      employees: this.employees,
      meniuId: this.meniuId
    }

    this.restaurantService.addRestaurant(newRestaurant).subscribe((restaurantId) => {
      newRestaurant.id = restaurantId;
      this.valueCreated.push(newRestaurant);
      this.getData();
    })

    this.resetValues();

    this.hideMode = true;

  }

  deleteRestaurant(id: number): void{
    this.restaurantService.deleteRestaurant(id).subscribe(()=> {
      let index = this.restaurants.map(r => r.id).indexOf(id);
      this.restaurants.splice(index, 1);
    })
  }

  loadRestaurant(restaurant: Restaurant): void {
    
    this.hideMode = false;
    this.editMode = true;
  
    this.id = restaurant.id;
    this.title = restaurant.title;
    this.customers = restaurant.customers;
    this.employees = restaurant.employees;
    this.meniuId = restaurant.meniuId;
  
  }

  sendUpdatedRestaurant(): void {
    var updatedValue: RestaurantCreateEdit = {
      id: this.id,
      title: this.title,
      customers: this.customers,
      employees: this.employees,
      meniuId: this.meniuId
    }

  this.restaurantService.updateRestaurant(updatedValue).subscribe(()=>{
    this.getData();
      })

  this.resetValues();
  
  this.hideMode = true;
  this.editMode = false;

  }

  resetValues(): void{
    this.title = "";
    this.customers = null;
    this.employees = null;
    this.meniuId = null;
  }

}
