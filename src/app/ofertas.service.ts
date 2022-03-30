import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Oferta } from "./shared/oferta.model"

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) {

    }
    
    public getOfertas(): Promise<Array<Oferta>>{
        return this.http.get('http://localhost:3000/ofertas')
            .toPromise()
            .then((resposta: any) => resposta)
    }   
}