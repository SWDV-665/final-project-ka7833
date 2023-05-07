import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { environment } from '../../../environments/environment';
import { Router, NavigationExtras } from '@angular/router';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  imageBaseUrl = environment.images;
  movie: any = null;
  id: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private _router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getMovieDetails(this.id)
  }

  getMovieDetails(id: any) {
    this.movieService.getMovieDetails(id).subscribe((res) => {
    this.movie = res;
    })
  }


  openHomepage(homepage: string){
    window.open(homepage);
  }

  gotoComments(){
    const navigationExtras: NavigationExtras = {
      state: {
        movie: this.movie
      }
    }
    this._router.navigateByUrl(`/comments/${this.id}`, navigationExtras);
    //this._router.navigate([`/comments/${this.id}`,{ movie: this.movie }]);
  }

  async shareItem(movie:any) {
      await Share.share({
        title: movie.title,
        text: 'Really awesome thing you need to see right now',
        dialogTitle: 'Share with friends',
        url: movie.homepage
      }).then(() => {
        console.log("Shared successfully")
      }).catch((error) => {
        console.error("Error while sharing ", error)
      })
  }
}
