import { Component } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";
import { TransactionsSectionComponent } from "./transactions-section.component";

@Component({
    selector: 'app-balance-page',
    template: `
    <section>
        <app-balance-section></app-balance-section>
        <app-transactions-section></app-transactions-section>
    </section>
    `,
    imports: [BalanceSectionComponent, TransactionsSectionComponent],
    standalone: true,
})
export class BalancePageComponent {}