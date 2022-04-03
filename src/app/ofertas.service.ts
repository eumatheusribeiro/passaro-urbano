import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Oferta } from "./shared/oferta.model"
import { URL_API } from './app.api';

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) {

    }
    
    public getOfertas(): Promise<Array<Oferta>>{
        return this.http.get(`${URL_API}?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }   

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}?categoria=${categoria}`)
                .toPromise()
                .then((resposta: any) => resposta)
    }

    public getOfertasPorId(id: number) : Promise<Oferta> {
        return this.http.get(`${URL_API}?id=${id}`)
                .toPromise()
                .then((resposta: any) => resposta[0]) 
    }
}