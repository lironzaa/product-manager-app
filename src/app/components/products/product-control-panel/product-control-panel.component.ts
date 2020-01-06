import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './../../../services/products.service';

@Component({
  selector: 'app-product-control-panel',
  templateUrl: './product-control-panel.component.html',
  styleUrls: ['./product-control-panel.component.scss']
})
export class ProductControlPanelComponent implements OnInit {

  constructor(private router: Router,
    private productsService: ProductsService) { }

  ngOnInit() {
  }

  addNewProduct() {
    this.productsService.showProductDetail.next(true);
    this.router.navigate([`products/0`]);
  }

}