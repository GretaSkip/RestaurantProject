import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meniu } from '../models/meniu';

@Injectable({
  providedIn: 'root'
})
export class MeniuService {
  
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }


public getMenius(): Observable<Meniu[]> {
  return this.http.get<Meniu[]>("https://localhost:44321/Meniu");
}

public addMeniu(meniu: Meniu):Observable<number> {
  return this.http.post<number>("https://localhost:44321/Meniu", meniu);
}

public deleteMeniu(id: number): Observable<Meniu> {
  return this.http.delete<Meniu>(`https://localhost:44321/Meniu/${id}`);
}

public updateMeniu(meniu: Meniu): Observable<Meniu> {
  return this.http.put<Meniu>(`${"https://localhost:44321/Meniu"}/${meniu.id}`, meniu);
}
 
}
