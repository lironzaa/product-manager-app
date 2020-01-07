import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Product } from '../models/products.model';
import { Subject } from 'rxjs';
import { map, endWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private products: Product[] = [];
  productsUpdated = new Subject<{ products: Product[] }>();
  showProductDetail = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  fetchProducts(): void {
    this.http.get<any>(this.apiUrl)
      .pipe(map((productsData: any) => {
        return productsData.map(product => {
          delete product.type;
          if (!product.creationDate) {
            Object.entries(product).forEach((item: any) => {
              if (typeof (item) === 'object') {
                if (item[1].length > 0) {
                  item[1].forEach(array => {
                    this.products.push(array);
                  })
                }
                else {
                  this.products.push(item[1]);
                }
              }
            })
          }
          else { this.products.push(product) }
        })
      }), endWith(this.products))
      .subscribe((transformedProductsData) => {
        this.setProducts(transformedProductsData);
      });
  }

  getProduct(index: number): Product {
    const fixedIndex = (index - 1);
    return this.products[fixedIndex];
  }

  sortProducts(selectedSortOption): void {
    if (selectedSortOption === 'Name') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSortOption === 'Price') {
      this.products = this.products.sort((a, b) => a.price - b.price);
    }
  }

  setProducts(products: Product[]): void {
    this.products = products;
    this.productsUpdated.next({ products: this.products });
  }

}