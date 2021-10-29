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

  public id: number = 0;
  public title: string = "";
  public price: number = 0;
  public weight: number = 0;
  public meat: number = 0;
  public about: string = ""
  
  public menius: Meniu[] = [];

  public hidden: boolean = true;

  ngOnInit(): void {
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
    })

    this.hidden = true;

  }
  
  deleteMeniu(id: number): void {
    this.meniuService.deleteMeniu(id).subscribe(()=> {
      let index = this.menius.map(m => m.id).indexOf(id);
      this.menius.splice(index, 1);
    })
  }

}
