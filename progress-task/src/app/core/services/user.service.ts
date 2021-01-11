import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/components/models/IUser.model';


// const CREATE_ACTION = 'create';
// const UPDATE_ACTION = 'update';
// const REMOVE_ACTION = 'destroy';
const USERS_URL ='https://my-json-server.typicode.com/yanmariomenev/Progress-Task/users'

@Injectable({
  providedIn: 'root'
})
export class UserService extends BehaviorSubject<any[]>{

  constructor(private http: HttpClient) { super([]); }


  getUsers(){
    return this.http.get(USERS_URL);
  }

  public save(data: User, isNew?: boolean) {
    // const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

    if(isNew){
      this.http.post(USERS_URL, data).subscribe(data => {
        console.log(data);
      });
    }
    else{
      let userId ="/" + data.id;
      this.http.put(USERS_URL + userId, data).subscribe(data => {
        console.log(data);
      });
    }

      
}

  public remove(user: User) {
    
    var id = user.id;
    this.http.delete(USERS_URL + user.id).subscribe(data => {
      console.log(data);
    });
}

}
