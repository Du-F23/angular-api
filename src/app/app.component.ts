import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OnInit } from '@angular/core';

interface coins{
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  coins: coins[]=[]
  filtro: coins[]=[]
titulos: string[]=[
  '#',
  'Mondeda',
  'Precio',
  'Cambio de valor',
  'Valor en 24 horas',
]

searchtext ='';
  constructor(private http: HttpClient){}
searchcoin(){
this.filtro = this.coins.filter((coins) => coins.name.toLowerCase().includes(this.searchtext.toLocaleLowerCase())
||
  coins.symbol.toLowerCase().includes(this.searchtext.toLocaleLowerCase())
  );
}

 ngOnInit(){
this.http.get<coins[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=MXN&order=market_cap_desc&per_page=100&page=1&sparkline=false')
.subscribe(
  (res) =>{
    console.log(res);
    this.coins = res;
    this.filtro = res;
  },(err) => console.log(err)
);
  }

}
