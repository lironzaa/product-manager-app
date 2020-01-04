import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
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
    private router: Router) { }

  ngOnInit() {
    console.log('test');

    this.route.firstChild.params.subscribe(
      (params: any) => {
        console.log(params);
        this.product = this.productsService.getProduct(params.id);
        console.log(this.product);
      }
    )
  }

  test() {
    this.router.navigate(['products/2']);
  }
}