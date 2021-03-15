import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostService } from 'src/app/service/post.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)

  }

  findByIdPostagem(id: number){
    this.postService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  deletar(){
    this.postService.deletePostagem(this.idPost).subscribe(()=>{
      alert('Postagem deletada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
