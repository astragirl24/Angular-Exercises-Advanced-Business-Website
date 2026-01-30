import { Component } from '@angular/core';
import { CatalogService } from '../catalog-service'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class CatalogComponent {

  categories: any[] = [];

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.categories = this.catalogService.getCategories();
  }

}