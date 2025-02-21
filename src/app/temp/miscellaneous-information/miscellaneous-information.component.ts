import { Component } from '@angular/core';
import { MainModule } from "../main/main.module";
import { Footer2Component } from "../footer2/footer2.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-miscellaneous-information',
  standalone: true,
  imports: [
    MainModule,
    CommonModule
  ],
  templateUrl: './miscellaneous-information.component.html',
  styleUrl: './miscellaneous-information.component.css'
})
export class MiscellaneousInformationComponent {
  fundsList: any[] = [];
  isIconRight: boolean = true;

  funds = [
    { name: "ABL Income Fund", NTN: "3161235-7" },
    { name: "ABL Stock Fund", NTN: "3330264-2" },
    { name: "ABL Islamic Income Fund", NTN: "3606843-8" },
    { name: "ABL Cash Fund", NTN: "3603196-8" },
    { name: "ABL Government Securities Fund", NTN: "3833447-0" },
    { name: "ABL Islamic Stock Fund", NTN: "4140511-7" },
    { name: "ABL Pension Fund", NTN: "4295891-1" },
    { name: "ABL Islamic Pension Fund", NTN: "4299456-0" },
    { name: "ABL Financial Planning Fund", NTN: "7162884-0" },
    { name: "ABL Islamic Financial Planning Fund", NTN: "7163445-3" },
    { name: "ABL Islamic Dedicated Stock Fund", NTN: "7354320-6" },
    { name: "ABL Islamic Asset Allocation Fund", NTN: "8900658-0" },
    { name: "Allied Finergy Fund", NTN: "5113966-4" },
    { name: "ABL Special Savings Fund", NTN: "6273783-0" },
    { name: "ABL Islamic Cash Fund", NTN: "6933541-4" },
    { name: "ABL Financial Sector Fund", NTN: "6450297-0" },
    { name: "ABL Fixed Rate", NTN: "A961059" },
    { name: "ABL Money Market Plan", NTN: "A961880" },
    { name: "ABL Islamic Money Market Plan", NTN: "A963880" },
    { name: "ABL-GOKP Islamic Pension Fund", NTN: "C790544" },
    { name: "ABL-GOKP Pension Fund", NTN: "C664981" },
    { name: "ABL Islamic Sovereign Fund", NTN: "D581396" },
    { name: "ABL Islamic Fixed Term Fund", NTN: "D885569" },
    { name: "ABL Asset Management Company Limited", NTN: "3028178-4" }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('Funds:', this.funds);
    this.fundsList = [...this.funds];
  }

  onChangeIcon() {
    this.isIconRight = !this.isIconRight;
  }
}
