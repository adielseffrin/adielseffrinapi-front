import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { InfoRequest } from './models/info-request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  public title = 'pizza';
  public token: string = "";
  public userId: string = "";
  public userName: string = "";
  public freeSlots = 21;

  public ingredientsArray : Array<any> = [];

  private twitch = window.Twitch.ext;
  private ingredientsPath: any;
  
  private pathToIngredientImage = "assets/img/{ingredient}";


  constructor(
    private ref: ChangeDetectorRef,
    private http: HttpClient
    ){
    // this.ingredientsPath = () => {
    //   const pathToIngredientImage = "assets/img/{ingredient}.png";
    //   const ingredients = [
    //     "alho",
    //     "tomate",
    //     "azeite-oleo",
    //     "azeitona",
    //     "calabresa",
    //     "milho",
    //     "queijo",
    //     "oregano",
    //     "pizza-fatia",
    //     "pizza",
    //   ];

    //   const slot = ingredients.map((item) =>
    //     ({ingr: pathToIngredientImage.replace("{ingredient}", item), qtde: 3})
    //   );
    //   return slot;
    // }
    this.twitchAuthorize.bind(this);
  }

  ngOnInit(){
    this.twitchContext();
    this.twitchAuthorize();
    // this.ingredientsArray = this.ingredientsPath();
    this.freeSlots = this.freeSlots - this.ingredientsArray.length;

  }

  private twitchContext(){
    this.twitch.onContext((context:any) => {
      this.twitch.rig.log(context);
    });
  }

  //debuga isso aqui mano
  private twitchAuthorize(){
    this.twitch.onAuthorized((auth:any) => {
      let token = auth.token;
      //console.log(token);
      //console.log(auth);
      // let userId = auth.userId;

      var parts=auth.token.split(".");
      var payload=JSON.parse(window.atob(parts[1]));
      this.userId = payload.user_id;//trocar pelo nick
      this.ref.detectChanges()
      this.makeGetRequest(this.userId, token);
      
    });
  }

  private urlteste = "http://localhost:8000/pizza/info/";
  private makeGetRequest(id:string, token : string){
    const httpHeaders: HttpHeaders = new HttpHeaders({
      JWT: token
    });
    this.http.get<InfoRequest>(this.urlteste, {headers : httpHeaders})
    .subscribe(
      res => 
      {
        this.ingredientsArray = res.ingredientes.map((item) =>
        ({ingr: this.pathToIngredientImage.replace("{ingredient}", item.name_image_ext), qtde: item.quantidade})
      );
      this.userName = res.info.nick;
      this.ref.detectChanges();
      }
      ,err => console.log(err)
    )
  }
  // private makeGetRequest(token : string){
  //   const httpHeader = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Extension '+token,
  //       'client-id': 'vjtdiahnhqjcmblifqe0javwuy47ci'
  //     })
  //   } 

  //   this.http.get(this.urlteste, {headers: httpHeader.headers})
  //   .subscribe(
  //     res => console.log(res),
  //     err => console.log(err)
  //   )
  // }


}
