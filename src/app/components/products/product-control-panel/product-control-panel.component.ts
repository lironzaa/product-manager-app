import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../services/products.service';

@Component({
  selector: 'app-product-control-panel',
  templateUrl: './product-control-panel.component.html',
  styleUrls: ['./product-control-panel.component.scss']
})
export class ProductControlPanelComponent implements OnInit {
  selectOptions: string[];
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.selectOptions = ['Select Value', 'Name', 'Price'];
  }

  onSelect(selectedSortOption) {
    this.productsService.sortProducts(selectedSortOption);
  }

}