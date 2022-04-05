import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica?: string

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe((parametros: any) => {
      this.ofertaService.getOndeFicaOfertaPorId(parametros.id)
      .then((descricao: string) => {
        this.ondeFica = descricao
      })
    })

  }

}
