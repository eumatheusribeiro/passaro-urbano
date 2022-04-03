import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OfertasService } from '../ofertas.service';
import { catchError } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, of, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas?: Observable<Oferta[]>
  public ofertas2?: Oferta[]
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
   this.ofertas =  this.subjectPesquisa //retorno Oferta[]
   .pipe(debounceTime(1000)) //executa a ação do switchMap após 1 segundo
   .pipe(distinctUntilChanged())
   .pipe(switchMap((termo: string) => {
     if(termo.trim() === '') {
       //retornar um observable de array de oferta vazio
       return of<Oferta[]>([])
     }
      return this.ofertasService.pesquisaOfertas(termo)
   }))
   .pipe(catchError((erro: any) => {
     console.log(erro)
     return of<Oferta[]>([])
   }))

   this.ofertas.subscribe((ofertas: Oferta[]) => {
     this.ofertas2 = ofertas
   })
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

}
