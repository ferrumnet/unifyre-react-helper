import {IntlManager, intl} from "./IntlManager";

const RES1 = `-metal=Gold`;

const RES2 = `
tobuy = You are to buy some {-metal}
  .price = Price of you { -metal } will be $2,000
`;

it('Loads the bundle correctly', () => {
    IntlManager.instance.load([RES1, RES2], 'en-US')

    expect(intl('tobuy')).toBe('You are to buy some ⁨Gold⁩');
    expect(intl('tobuy.price')).toBe('Price of you ⁨Gold⁩ will be $2,000');
});
