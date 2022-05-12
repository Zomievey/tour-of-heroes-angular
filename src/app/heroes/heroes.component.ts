import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    console.log(name);
    console.log(this.heroes);
    console.log(this.heroes.length);
    console.log(123, name);
    console.log(456, { name }); // shorthand for {name: name} to create an object

    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  //deleteHero() calls HttpClient.delete()
  //The URL is the heroes resource URL plus the id of the hero to delete
  //You don't send data as you did with put() and post()
  //You still send the httpOptions
}
