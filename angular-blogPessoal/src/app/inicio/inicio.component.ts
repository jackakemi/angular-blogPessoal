import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostService } from '../service/post.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    if(environment.token == ''){
      /*alert('Sua sessão expirou, faça o login novamente')*/
      this.router.navigate(['/login'])
    }

    this.getAllTheme()
    this.getAllPost()
  }

  getAllTheme(){
    this.themeService.getAllTheme().subscribe((resp: Tema[])=>{   //chamar essa funçaõ dentro do botão selecionar
      this.listaTemas = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTheme(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  getAllPost(){
    this.postService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{    //entra na pasta service, pega o metodo post, passa pra ele oq precisa pra postar, subscreva o typescript pra Json e envia a postagem
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem() // zerar o campo de postagem
      this.getAllPost()   //atualizar com as novas postagens
    })
  }

}
