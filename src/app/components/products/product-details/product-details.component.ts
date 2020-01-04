import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  id: number;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.route.firstChild.params.subscribe(
      (params: any) => {
        this.product = this.productsService.getProduct(params.id);
        console.log(this.product);
      }
    )
  }
}