import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productIndex: number;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    console.log('init');
    this.route.firstChild.params.subscribe(
      (params: Params) => {
        this.productIndex = params.id;
        this.product = this.productsService.getProduct(params.id);
        if (params.id == 0) {
          this.product = {
            id: null,
            name: '',
            description: '',
            price: null,
            creationDate: null,
            thumbnailUrl: '',
            url: ''
          }
        }
      })
  }

  onSubmit({ valid }): void {
    console.log(this.productIndex);
    this.productsService.updateProduct(this.product.id, this.product);
  }

}