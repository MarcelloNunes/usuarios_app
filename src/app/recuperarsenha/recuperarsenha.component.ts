import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recuperarsenha',
  templateUrl: './recuperarsenha.component.html',
  styleUrls: ['./recuperarsenha.component.css']
})
export class RecuperarsenhaComponent {

  mensagem_sucesso: String = '';
  mensagem_erro: String = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }


  //criando um objeto para capturar o formulário
  formRecuperarSenha = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get form(): any {
    return this.formRecuperarSenha.controls;
  }
  onSubmit(): void {
    this.spinner.show

    this.httpClient.post(environment.apiUsuarios + "/recuperar-senha", this.formRecuperarSenha.value
    ).subscribe({
      next:(data:any)=>{
        this.mensagem_sucesso = data.mensagem;
        this.formRecuperarSenha.reset();
      },
      error:(e) =>{
        this.mensagem_erro = e.error.mensagem;

      }
    }).add(()=> {
      this.spinner.hide();
    });




  }
}






