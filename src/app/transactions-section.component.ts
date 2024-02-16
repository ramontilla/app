import { Component, inject } from "@angular/core";
import { ShyftApiService } from './services/shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-transactions-section',
    template: `
        <section class="px-16 py-24">
            <h2 class="text-center text-3xl">Transactions</h2>
            <ul class="flex justify-center items-center gap-16">
                <li class="text-xl">Date</li>
                <li class="text-xl">Sender</li>
                <li class="text-xl">Receiver</li>
                <li class="text-xl">Amount</li>
            </ul>

            @if (transactions()) {
                <div class="flex justify-center items-center gap-2">
                    <p class="text-xl"> {{ transactions()?.timestamp | date}} </p>
                    <p class="text-xl"> {{ transactions()?.actions?.info?.sender }} </p>
                    <p class="text-xl"> {{ transactions()?.actions?.info?.receiver }} </p>
                    <p class="text-xl"> {{ transactions()?.actions?.info?.amount | number }} </p>
                </div>
            }
        </section>
     `,
    imports: [DecimalPipe, DatePipe],
    standalone: true,
})
export class TransactionsSectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  
    readonly transactions = computedAsync(
      () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
      { requireSync: false },
    );
}