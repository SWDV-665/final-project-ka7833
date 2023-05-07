import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  public alertButtons = ['OK'];
  movie: any = null;
  imageBaseUrl = environment.images;
  name = null;
  email = null;
  comment = null;

  constructor(private route: ActivatedRoute, private router: Router, private commentService: CommentsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log("This is your id from comments page", id)

    const routerState = this.router.getCurrentNavigation()?.extras.state;
    this.movie = routerState?.movie;
  }

  leaveComments(id: string){
    console.log("Leaving movie comments for ", id)
  }

  submitComment(){
    const commentData = {
      name: this.name,
      email: this.email,
      movieId: this.movie.id,
      comment: this.comment
    };

    this.commentService.submitComment(commentData);
  }
}
