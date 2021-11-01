import { Component, OnInit } from '@angular/core';
import { Meniu } from 'src/app/models/meniu';
import { MeniuService } from 'src/app/services/meniu.service';

@Component({
  selector: 'app-meniu',
  templateUrl: './meniu.component.html',
  styleUrls: ['./meniu.component.css']
})
export class MeniuComponent implements OnInit {

  private meniuService: MeniuService;

  constructor(meniuService: MeniuService) {
    this.meniuService = meniuService;
   }

  public id: number;
  public title: string;
  public price: number;
  public weight: number;
  public meat: number;
  public about: string
  
  public menius: Meniu[] = [];

  public hideMode: boolean = true;
  public editMode: boolean = false;


  ngOnInit(): void {
    this.getData();
  }

  public getData(): void{
    this.meniuService.getMenius().subscribe((meniusFromApi) => {
      this.menius = meniusFromApi;
    })
  }

  public addMeniu(): void {
    var newMeniu: Meniu = {
      id: this.id,
      title: this.title,
      price: this.price,
      weight: this.weight,
      meat: this.meat,
      about: this.about
    }

    this.meniuService.addMeniu(newMeniu).subscribe((meniuId) => {
      newMeniu.id = meniuId;
      this.menius.push(newMeniu);
      this.getData();
    })

    
    this.hideMode = true;

  }
  
  
  deleteMeniu(id: number): void {
    this.meniuService.deleteMeniu(id).subscribe(()=> {
      let index = this.menius.map(m => m.id).indexOf(id);
      this.menius.splice(index, 1);
    })
  }

  loadMeniu(meniu: Meniu): void {
    
    this.hideMode = false;
    this.editMode = true;
  
    this.id = meniu.id;
    this.title = meniu.title;
    this.price = meniu.price;
    this.weight = meniu.weight;
    this.meat = meniu.meat;
    this.about = meniu.about;
  
  }

  sendUpdatedMeniu(): void {
    var updatedValue: Meniu = {
      id: this.id,
      title: this.title,
      price: this.price,
      weight: this.weight,
      meat: this.meat,
      about: this.about
    }

  this.meniuService.updateMeniu(updatedValue).subscribe(()=>{
      this.getData();
      })
  
  this.hideMode = true;
  this.editMode = false;
  
  }

}



