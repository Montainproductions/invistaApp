import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-add-fuel-success',
  templateUrl: './add-fuel-success.page.html',
  styleUrls: ['./add-fuel-success.page.scss'],
  standalone: false
})
export class AddFuelSuccessPage implements OnInit {

  codeEquipment: any | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
  ) { 
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        console.log(navigation.extras);
        this.codeEquipment = navigation.extras.state['code'] ?? '';
      } 
      console.log(this.codeEquipment);
    });
  }

  ngOnInit() {
  }

  goToFuelEquipment() {
    let navigationExtrars: NavigationExtras = {
      state: {
        code: this.codeEquipment
      }
    };
    this.router.navigateByUrl('/equipment/fuel', navigationExtrars);
  }

}
