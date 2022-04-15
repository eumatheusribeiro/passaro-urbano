import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra?: string
  public itensCarrinho: ItemCarrinho[] = []

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(
    private ordemCompraService: OrdemCompraService, 
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco')?.markAllAsTouched()
      this.formulario.get('numero')?.markAllAsTouched()
      this.formulario.get('complemento')?.markAllAsTouched()
      this.formulario.get('formaPagamento')?.markAllAsTouched()
    } else {

      if(this.carrinhoService.exibirItens().length === 0) {
        alert('Você nao selecionou nenhum item!')
      } else {
      
      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()
        )

        this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido: any) => {
          this.idPedidoCompra = idPedido
          this.carrinhoService.limparCarrinho()
        })
      }
    }

  }
  
  public adicionarItem(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)
  }

  public removerItem(item: ItemCarrinho): void {
    this.carrinhoService.removerQuantidade(item)
  }

  public totalCarrinhoCompras(): number {
    return this.carrinhoService.totalCarrinhoCompras()
  }

}
