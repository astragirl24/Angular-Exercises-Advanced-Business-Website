import { Component } from '@angular/core';

@Component({
  selector: 'app-learndirective',
  standalone: false,
  templateUrl: './learndirective.html',
  styleUrl: './learndirective.css',
})
export class Learndirective {
  flag_value:number=1;
  
  changeView()
  {
    if (this.flag_value==1)
      this.flag_value=2;
    else
    {
      this.flag_value=1;
    }
}
  products=["Chủ tịch", "Giám đốc", "Trưởng phòng"];
  customers=[
    {id:'C1', name:'Nguyễn Văn A', location:'Hà Nội'},
    {id:'C2', name:'Trần Thị B', location:'Đà Nẵng'},
    {id:'C', name:'Lê Văn C', location:'Hồ Chí Minh'}
  ]
}
