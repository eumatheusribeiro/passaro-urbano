import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Oferta } from "./shared/oferta.model"
import { URL_API } from './app.api';

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) {

    }
    
    public getOfertas(): Promise<Array<Oferta>>{
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }   

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
                .toPromise()
                .then((resposta: any) => resposta)
    }

    public getOfertasPorId(id: number) : Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
                .toPromise()
                .then((resposta: any) => resposta[0]) 
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0].descricao
        })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0].descricao
        })
    }
}