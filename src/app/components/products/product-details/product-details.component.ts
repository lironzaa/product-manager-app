import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Product } from 'src/app/models/products.model';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
    this.toastr.success(`Thank you for updating product ${this.product.name}`, 'Product updated!');
  }

}