import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private dataSubject = new BehaviorSubject<string>('');
  condition$ = this.dataSubject.asObservable();

  sendData(value: string) {
    this.dataSubject.next(value);
  }

}
