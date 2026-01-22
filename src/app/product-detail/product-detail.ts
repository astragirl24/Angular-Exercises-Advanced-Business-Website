import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: 'product-detail.html',
  styleUrl: 'product-detail.css',
})
export class ProductDetail {
  products = [
    { ProductId: 'p1', ProductName: 'Peach Avocado Smoothie', Price: 100000, Image: 'https://www.simplotfood.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2F7llDcpQxqyV49PFWvwwwCx%2F15ce409ef1edde61fa586f63263f5bdf%2FPeachAVOSmoothie.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { ProductId: 'p2', ProductName: 'Cranberry Orange Smoothie', Price: 300000, Image: 'https://www.simplotfood.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2F01y4xunF93ZpNSiWVrdOCG%2Fb0e0e1f374ec1e946bd43293507e280c%2FCranBryOrangeSmoothie.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { ProductId: 'p3', ProductName: 'Choco Calada', Price: 200000, Image: 'https://www.simplotfood.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2F5JFXhjkTGqTeGjVw8C5SH1%2Fc688d9013494f139bda28dbb0ae081ba%2FChocoColadaSmoothie.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { ProductId: 'p4', ProductName: 'Sweet Potato Crinkle Cut Fries', Price: 100000, Image: 'https://dam.simplot.com/transform/e9b7e46c-56c3-41c5-bf1b-fdd1f69c89a0/10071179020356_A1CD?io=transform%3Ascale%2Cwidth%3A1200%2Cheight%3A1200&format=webp' },
    { ProductId: 'p5', ProductName: 'Triple Berry Blend', Price: 300000, Image: 'https://dam.simplot.com/transform/c4f27f5a-10c6-4a30-ab7f-1b0ba6273c84/10071179016311_A1CD-jpg?io=transform%3Ascale%2Cwidth%3A1200%2Cheight%3A1200&format=webp' }
  ]
  product_selected: any;
  constructor(private router: Router, private activerouter: ActivatedRoute) {
    activerouter.paramMap.subscribe((param)=>{
      let id=param.get("id"); 
      this.product_selected=this.products.find(p=>p.ProductId==id);
   } 
  );
  } 
  go_back(){
    this.router.navigate(["/products"]);
  }
}
