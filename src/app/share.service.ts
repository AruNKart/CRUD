import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private _api:HttpClient) { }

  postData(data:any){
return this._api.post("http://localhost:3000/posts",data)
  }
  getData(){
    return this._api.get("http://localhost:3000/posts")
  }

  delete(id:number){
    return this._api.delete("http://localhost:3000/posts/"+id)
  }
  updateData(value:any,id:number){
    return this._api.put("http://localhost:3000/posts/"+id,value)
  }
}

