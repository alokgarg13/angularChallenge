import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {

  isAdd = true;
  isEdit = false;
  productId: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;

    this.isEdit = routeParams.get('id') ? true : false;
    if(this.isEdit) {
      this.isAdd = false;
      this.productId = Number(routeParams.get('id'));
    }

  }

}
