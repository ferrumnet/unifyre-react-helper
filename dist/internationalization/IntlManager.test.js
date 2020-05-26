"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntlManager_1 = require("./IntlManager");
const RES1 = `-metal=Gold`;
const RES2 = `
tobuy = You are to buy some {-metal}
  .price = Price of you { -metal } will be $2,000
`;
it('Loads the bundle correctly', () => {
    IntlManager_1.IntlManager.instance.load([RES1, RES2], 'en-US');
    expect(IntlManager_1.intl('tobuy')).toBe('You are to buy some ⁨Gold⁩');
    expect(IntlManager_1.intl('tobuy.price')).toBe('Price of you ⁨Gold⁩ will be $2,000');
});
//# sourceMappingURL=IntlManager.test.js.map