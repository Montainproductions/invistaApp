import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvistaService {
  constructor(
    private httpService: HttpService
  ) { }

  login(data: any) {
    return this.httpService.doPost(environment.url + `login`, data);
  }

  /* Equipment */
  listEquipments(role_id: any, document: any) {
    return this.httpService.doGet(environment.url + `list-equipment?role_id=` + role_id + `&document=` + document, );
  }

  findEquipment(code: any) {
    return this.httpService.doGet(environment.url + `find-equipment?code=` + code, );
  }

  listKmEquipment(document: any, company_id: any, code: any) {
    return this.httpService.doGet(environment.url + `equipment/list-km?document=` + document + `&company_id=` + company_id + `&code=` + code, );
  }

  findEquipmentKm(id: any) {
    return this.httpService.doGet(environment.url + `find-equipment-km?id=` + id, );
  }

  findEquipmentFuel(id: any) {
    return this.httpService.doGet(environment.url + `find-equipment-fuel?id=` + id, );
  }

  findEquipmentMaintenance(id: any) {
    return this.httpService.doGet(environment.url + `find-equipment-maintenance?id=` + id, );
  }

  listFuelEquipment(document: any, company_id: any, code: any) {
    return this.httpService.doGet(environment.url + `equipment/list-fuel?document=` + document + `&company_id=` + company_id + `&code=` + code, );
  }  

  listMaintenanceEquipment(role_id: any, company_id: any, code: any, document: any) {
    return this.httpService.doGet(environment.url + `equipment/list-maintenance?role_id=` + role_id + `&company_id=` + company_id + `&code=` + code + `&document=` + document, );
  }  

  storeKmEquipment(data: any) {
    return this.httpService.doPost(environment.url + `store-km-equipment`, data);
  }

  updateKmEquipment(data: any) {
    return this.httpService.doPost(environment.url + `update-km-equipment`, data);
  }

  storeFuelEquipment(data: any) {
    return this.httpService.doPost(environment.url + `store-fuel-equipment`, data);
  }

  updateFuelEquipment(data: any) {
    return this.httpService.doPost(environment.url + `update-fuel-equipment`, data);
  }

  storeMaintenanceEquipment(data: any) {
    return this.httpService.doPost(environment.url + `store-maintenance-equipment`, data);
  }

  updateMaintenanceEquipment(data: any) {
    return this.httpService.doPost(environment.url + `update-maintenance-equipment`, data);
  }

  /* Nuevas paginas */
  getInspectionTypes(data: any){
    return this.httpService.doPost(environment.url + `inspection-types`, data);
  }

  getEmployee(data: any){
    return this.httpService.doPost(environment.url + `employee`, data);
  }

  createItems(data: any){
    return this.httpService.doPost(environment.url + `create-items`, data);
  }

  getResponsableTypes(data: any){
    return this.httpService.doPost(environment.url + `responsable-types`, data);
  }

  getCriteria(data: any){
    return this.httpService.doPost(environment.url + `criteria`, data);
  }
}
