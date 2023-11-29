import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  
  shoppingInput: string = "";
  total: number | null = null;
  amountPaid: number | null = null;
  due: number | null = null;
  changeDue: Map<number, number> = new Map<number, number>;

  calculateTotal(): void {
    const prices: number[] = this.shoppingInput.split(',').map(price => parseFloat(price));

    this.total = this.additionalTotalShopping(prices);

  }

  calculateChangeDue(): void {
    if(this.total !== null && this.amountPaid !== null) {
      this.due = this.amountPaid - this.total;
      
      this.changeDue = this.calculateChange(this.due);

      console.log("ChangeDue", this.changeDue);
    }
  }

  private additionalTotalShopping(prices: number[]): number {

    let sumInput: number = 0;

    prices.forEach((elt: number) => {
      sumInput = sumInput + elt;
    })

    return sumInput;
  }

  private calculateChange(due: number): Map<number, number> {

      const caisses: number[] = [10, 5, 1];
      const distribution: Map<number, number> = new Map<number, number>();

      caisses.forEach((elt : number) => {

        const count: number = Math.floor(due / elt);

        console.log("Rembousement", due);
        console.log("element de la caisse", elt);
        console.log("combien de fois un element de la caisse", count);

        if(count > 0) {
          distribution.set(elt, count);
          due = due - (count * elt);
        }

      });
      
      return distribution;
  }

}
