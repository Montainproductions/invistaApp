import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-add-maintenance-success',
  templateUrl: './add-maintenance-success.page.html',
  styleUrls: ['./add-maintenance-success.page.scss'],
  standalone: false
})
export class AddMaintenanceSuccessPage implements OnInit {

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

  goToMaintenanceEquipment() {
    let navigationExtrars: NavigationExtras = {
      state: {
        code: this.codeEquipment
      }
    };
    this.router.navigateByUrl('/equipment/maintenance', navigationExtrars);
  }

}
