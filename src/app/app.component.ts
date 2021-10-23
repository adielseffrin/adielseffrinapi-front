import { ChangeDetectorRef, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  public title = 'pizza';
  public token: string = "";
  public userId: string = "";
  public freeSlots = 21;

  public ingredientsArray : Array<any> = [];

  private twitch = window.Twitch.ext;
  private ingredientsPath: any;

  constructor(private ref: ChangeDetectorRef){
    this.ingredientsPath = () => {
      const pathToIngredientImage = "assets/img/{ingredient}.png";
      const ingredients = [
        "alho",
        "tomate",
        "azeite-oleo",
        "azeitona",
        "calabresa",
        "milho",
        "queijo",
        "oregano",
        "pizza-fatia",
        "pizza",
      ];

      const slot = ingredients.map((item) =>
        ({ingr: pathToIngredientImage.replace("{ingredient}", item), qtde: 3})
      );
      return slot;
    }
    this.twitchAuthorize.bind(this);
  }

  ngOnInit(){
    this.twitchContext();
    this.twitchAuthorize();
    this.ingredientsArray = this.ingredientsPath();
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
      console.log(this);
      // let token = auth.token;
      // let userId = auth.userId;

      var parts=auth.token.split(".");
      var payload=JSON.parse(window.atob(parts[1]));
      //this.userId = payload.user_id;//trocar pelo nick
      this.userId="teste 1";
      this.ref.detectChanges()
    });
  }


}
