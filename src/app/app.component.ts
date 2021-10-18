import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'pizza';
  public token: string = "";
  public userId: string = "";
  
  const twitch = window.Twitch.ext;
  ngOnInit(){
    this.twitchContext();
  }

  private twitchContext(){
    this.twitch.onContext((context:any) => {
      this.twitch.rig.log(context);
    });
  }

  private twitcAuthorize(){
    this.twitch.onAuthorized((auth:any) => {
      let token = auth.token;
      let userId = auth.userId;
      
      var parts=auth.token.split(".");
      var payload=JSON.parse(window.atob(parts[1]));
      this.userId = payload.user_id;//trocar pelo nick
        
    });
  }

}






/*
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    htmlArray = ingredientsPath.map(el => 
      `<div class="slot"><img src="${el.ingr}"><span class="quantity">${el.qtde}</span></div>`
    )
    for(let i = 0; i < 21 - ingredientsPath.length; i++){
      htmlArray.push('<div class="slot">x</div>');
    }  
    document.querySelector(".inventory__body").innerHTML = htmlArray.join('');
  }
}

//TODO trazer do BD
const ingredientsPath = (() => {
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
})();
*/
