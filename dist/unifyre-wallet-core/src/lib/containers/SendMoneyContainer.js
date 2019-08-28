define(["require", "exports", "../common/CurrencyValue", "../redux/actions/Actions", "../redux/ServerDataAdaptor", "../redux/ops/TradeOperations", "../common/services/GlobalContainer"], function (require, exports, CurrencyValue_1, Actions_1, ServerDataAdaptor_1, TradeOperations_1, GlobalContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dummyAmount = CurrencyValue_1.CurrencyValue.fromInt('NGN', 0);
    class SendMoneyReducer {
        static reduce(state = { amount: CurrencyValue_1.CurrencyValue.fromInt('NGN', 0),
            currency: 'NGN', notes: '' }, action) {
            switch (action.type) {
                case Actions_1.ActionTypes.NAVIGATE:
                    if (action['payload'].page !== 'sendMoney') {
                        // TODO: Don't do anything if we are not on a relevant page
                        return Object.assign({}, state, { amount: dummyAmount, notes: '', currency: 'NGN' });
                    }
                    return state;
                case Actions_1.ActionTypes.SEND_MONEY_CURRENCY_CHANGED:
                    const currency = action['payload'].currency;
                    return Object.assign({}, state, { amount: CurrencyValue_1.CurrencyValue.fromInt(currency, 0), currency: currency });
                case Actions_1.ActionTypes.SEND_MONEY_NOTES_CHANGED:
                    return Object.assign({}, state, { notes: action['payload'].notes });
                case Actions_1.ActionTypes.SEND_MONEY_AMOUNT_CHANGED:
                    return Object.assign({}, state, { amount: action['payload'] });
                default:
                    return state;
            }
        }
    }
    exports.SendMoneyReducer = SendMoneyReducer;
    const mapStateToProps = (state) => {
        return {
            notes: state.ui.forms.sendMoney.notes,
            currency: state.ui.forms.sendMoney.currency,
            amount: state.ui.forms.sendMoney.amount,
            balance: ServerDataAdaptor_1.ServerDataAdaptor.adaptAppBalance(state.data.balanceRaw),
            contact: state.ui.route.params['contact'],
        };
    };
    const mapDispatchToProps = (dispatch) => {
        return {
            onClose: () => dispatch(Actions_1.addAction(Actions_1.ActionTypes.NAVIGATE_POP_STACK, {})),
            onCurrencyChanged: c => dispatch(Actions_1.addAction(Actions_1.ActionTypes.SEND_MONEY_CURRENCY_CHANGED, { currency: c })),
            onNotesChanged: n => dispatch(Actions_1.addAction(Actions_1.ActionTypes.SEND_MONEY_NOTES_CHANGED, { notes: n })),
            onAmountChanged: a => dispatch(Actions_1.addAction(Actions_1.ActionTypes.SEND_MONEY_AMOUNT_CHANGED, a)),
            onNext: (c, a, n) => GlobalContainer_1.GlobalContainer.instance().get(TradeOperations_1.TradeOperations).validateSendMoney(c, a, n),
        };
    };
    class SendMoneyContainer {
    }
    SendMoneyContainer.mapStateToProps = mapStateToProps;
    SendMoneyContainer.mapDispatchToProps = mapDispatchToProps;
    exports.SendMoneyContainer = SendMoneyContainer;
});
//# sourceMappingURL=SendMoneyContainer.js.map