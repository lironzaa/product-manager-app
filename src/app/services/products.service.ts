import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Product } from '../models/products.model';
import { Subject, Observable } from 'rxjs';
import { map, endWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[] }>();
  showProductDetails = new Subject<boolean>();
  createMode = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  getProducts(): void {
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
        this.products = transformedProductsData;
        this.productsUpdated.next({ products: this.products });
      });
  }

  getProduct(index: number) {
    const fixedIndex = (index - 1)
    return this.products[fixedIndex];
  }

  getProductUpdateListener(): Observable<{ products: Product[] }> {
    return this.productsUpdated.asObservable();
  }

  updateProduct(index: number, product: Product) {
    this.products[--index] = product;
    this.productsUpdated.next({ products: this.products });
  }

}