import { AppBalance, AppContact } from '../redux/AppState';
import { CurrencyValue, Currency } from '../common/CurrencyValue';
import { AnyAction, Dispatch } from 'redux';
import { AppState } from '../redux/AppStateType';
export interface AppUiSendMoneyForm {
    amount: CurrencyValue;
    currency: Currency;
    notes: string;
}
export interface SendMoneyProps extends AppUiSendMoneyForm {
    balance: AppBalance;
    contact: AppContact;
}
export interface SendMoneyDispatch {
    onCurrencyChanged: (c: Currency) => void;
    onNotesChanged: (c: string) => void;
    onAmountChanged: (a: CurrencyValue) => void;
    onClose: () => void;
    onNext: (c: AppContact, a: CurrencyValue, n: string) => void;
}
export declare class SendMoneyReducer {
    static reduce(state: AppUiSendMoneyForm | undefined, action: AnyAction): AppUiSendMoneyForm;
}
export declare class SendMoneyContainer {
    static mapStateToProps: (state: AppState) => SendMoneyProps;
    static mapDispatchToProps: (dispatch: Dispatch<AnyAction>) => SendMoneyDispatch;
}
//# sourceMappingURL=SendMoneyContainer.d.ts.map