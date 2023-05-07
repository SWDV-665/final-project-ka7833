import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service'
import { LoadingController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // execute when
    this.loadMovies();
  }

  async loadMovies(ev?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {

      loading.dismiss();
      //this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      ev?.target.complete();

      if(ev){
        ev.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(ev: any) {
    this.currentPage++;
    this.loadMovies(ev);
    //(ev as InfiniteScrollCustomEvent).target.complete();
  }
}
