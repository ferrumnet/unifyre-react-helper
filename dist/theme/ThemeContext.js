"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const types_1 = require("./types");
const Theme_1 = require("./Theme");
const _sr = 0.5;
exports.defaultDarkThemeConstantsBuilder = types_1.ConstantBuilder.builder()
    .set(Theme_1.Theme.Spaces.screenMarginHorizontal, 50 * _sr)
    .set(Theme_1.Theme.Spaces.screenMarginVertical, 30 * _sr)
    .set(Theme_1.Theme.Spaces.gap, 60 * _sr)
    .set(Theme_1.Theme.Spaces.line, 30 * _sr)
    .set(Theme_1.Theme.Colors.bkgShade0, '#000000')
    .set(Theme_1.Theme.Colors.bkgShade1, '#111113')
    .set(Theme_1.Theme.Colors.bkgShade2, '#1C1C1E')
    .set(Theme_1.Theme.Colors.bkgShade3, '#48484A')
    .set(Theme_1.Theme.Colors.bkgShade4, '#FF3B2F')
    .set(Theme_1.Theme.Colors.bkgShade5, '#EEEEEE')
    .set(Theme_1.Theme.Colors.bkgShade6, '#09090A')
    .set(Theme_1.Theme.Colors.bkgShade7, '#1C1C1E')
    .set(Theme_1.Theme.Colors.bkgShade8, '#FFFFFF')
    .set(Theme_1.Theme.Colors.textColor, '#FFFFFF')
    .set(Theme_1.Theme.Colors.highlight, '#FF3B2F')
    .set(Theme_1.Theme.Button.btnPrimary, '#EEEEEE')
    .set(Theme_1.Theme.Button.inverseBtnPrimary, '#000000')
    .set(Theme_1.Theme.Button.btnHighlight, '#FF3B2F')
    .set(Theme_1.Theme.Button.btnPrimaryTextColor, '$Color.bkgShade1')
    .set(Theme_1.Theme.Button.inverseBtnPrimaryTextColor, '#FFFFFF')
    .set(Theme_1.Theme.Button.btnHighlightTextColor, '#FFFFFF')
    .set(Theme_1.Theme.Button.btnBorderRadius, 10 * _sr)
    .set(Theme_1.Theme.Button.btnPadding, 55 * _sr)
    .set(Theme_1.Theme.Font.main, 'SF Pro Text')
    .set(Theme_1.Theme.Text.textColor, '$Color.textColor')
    .set(Theme_1.Theme.Text.inversTextColor, '#FF3B2F')
    .set(Theme_1.Theme.Text.subTextColor, '#D1D1D6')
    .set(Theme_1.Theme.Text.linkColor, '#D1D1D6')
    .set(Theme_1.Theme.Text.infoColor, '#000000')
    .set(Theme_1.Theme.Text.h1Size, 55 * _sr)
    .set(Theme_1.Theme.Text.h2Size, 45 * _sr)
    .set(Theme_1.Theme.Text.h3Size, 35 * _sr)
    .set(Theme_1.Theme.Text.h4Size, 30 * _sr)
    .set(Theme_1.Theme.Text.pSize, 40 * _sr)
    .set(Theme_1.Theme.Text.numberUpColor, '#00FF40')
    .set(Theme_1.Theme.Text.numberDownColor, '$Color.highlight')
    .set(Theme_1.Theme.Page.titleColor, '#000000')
    .set(Theme_1.Theme.Page.titleSize, '$Text.h1Size')
    .set(Theme_1.Theme.Page.titleIconColor, '$Color.textColor')
    .set(Theme_1.Theme.Chart.redGradiantStart, '#000000')
    .set(Theme_1.Theme.Chart.redGradiantEnd, '#FF392C')
    .set(Theme_1.Theme.Input.inputBackground, '#1C1C1E')
    .set(Theme_1.Theme.Input.inputTextColor, '#FFFFFF')
    .set(Theme_1.Theme.Input.inputTextSize, 50 * _sr)
    .set(Theme_1.Theme.Input.inputLabelSize, 35 * _sr)
    .set(Theme_1.Theme.Input.inputLabelColor, '#D1D1D6')
    .set(Theme_1.Theme.Input.inputLargeLabelSize, 45 * _sr)
    .set(Theme_1.Theme.Input.inputLargeLabelColor, "$Color.textColor")
    .set(Theme_1.Theme.List.listItemPaddingTop, 30 * _sr)
    .set(Theme_1.Theme.List.listItemPaddingButtom, 30 * _sr)
    .set(Theme_1.Theme.List.listItemBorderColor, '#D1D1D6')
    .set(Theme_1.Theme.Icon.iconColor, '$Color.bkgShade2')
    .set(Theme_1.Theme.Icon.backgroundColor, '#1C1C1E')
    .set(Theme_1.Theme.Switch.thumbColor, '#D1D1D6')
    .set(Theme_1.Theme.Switch.backgroundColorFalse, '#111113')
    .set(Theme_1.Theme.Switch.backgroundColorTrue, '#1C1C1E')
    .set(Theme_1.Theme.Pin.keyboardBackground, '#1C1C1E')
    .set(Theme_1.Theme.Pin.keyboardTextColor, '#FFFFFF')
    .set(Theme_1.Theme.Pin.bubbleActive, '#FFFFFF')
    .set(Theme_1.Theme.Pin.bubbleInActive, '#1C1C1E')
    .set(Theme_1.Theme.Icon.iconBorderRadius, 5 * _sr);
exports.defaultGreenThemeConstantsBuilder = types_1.ConstantBuilder.builder()
    .set(Theme_1.Theme.Spaces.screenMarginHorizontal, 50 * _sr)
    .set(Theme_1.Theme.Spaces.screenMarginVertical, 30 * _sr)
    .set(Theme_1.Theme.Spaces.gap, 60 * _sr)
    .set(Theme_1.Theme.Spaces.line, 30 * _sr)
    .set(Theme_1.Theme.Colors.bkgShade0, '#FFFFFF')
    .set(Theme_1.Theme.Colors.bkgShade1, '#f2f2f2')
    .set(Theme_1.Theme.List.listItemBorderColor, '#D1D1D6')
    .set(Theme_1.Theme.Switch.thumbColor, '#f2f2f2')
    .set(Theme_1.Theme.Switch.backgroundColorFalse, '#FAFAFA')
    .set(Theme_1.Theme.Switch.backgroundColorTrue, '#26C97A')
    .set(Theme_1.Theme.Colors.bkgShade2, '#1C1C1E')
    .set(Theme_1.Theme.Colors.bkgShade3, '#FFFFFF')
    .set(Theme_1.Theme.Colors.bkgShade4, '#FFFFFF')
    .set(Theme_1.Theme.Colors.bkgShade5, '#EEEEEE')
    .set(Theme_1.Theme.Colors.bkgShade6, '#FAFAFA')
    .set(Theme_1.Theme.Colors.bkgShade7, '#212121')
    .set(Theme_1.Theme.Colors.bkgShade8, '#FFFFFF')
    .set(Theme_1.Theme.Colors.textColor, '#111113')
    .set(Theme_1.Theme.Colors.highlight, '#26C97A')
    .set(Theme_1.Theme.Button.btnPrimary, '#26C97A')
    .set(Theme_1.Theme.Button.inverseBtnPrimary, '#26C97A')
    .set(Theme_1.Theme.Button.btnHighlight, '#26C97A')
    .set(Theme_1.Theme.Button.btnPrimaryTextColor, '$Color.bkgShade1')
    .set(Theme_1.Theme.Button.inverseBtnPrimaryTextColor, '#FFFFFF')
    .set(Theme_1.Theme.Button.btnHighlightTextColor, '#FFFFFF')
    .set(Theme_1.Theme.Button.btnBorderRadius, 10 * _sr)
    .set(Theme_1.Theme.Button.btnPadding, 55 * _sr)
    .set(Theme_1.Theme.Font.main, 'SF Pro Text')
    .set(Theme_1.Theme.Text.textColor, '$Color.textColor')
    .set(Theme_1.Theme.Text.inversTextColor, '#212121')
    .set(Theme_1.Theme.Text.subTextColor, '#D1D1D6')
    .set(Theme_1.Theme.Text.linkColor, '#D1D1D6')
    .set(Theme_1.Theme.Text.infoColor, '#212121')
    .set(Theme_1.Theme.Text.h1Size, 55 * _sr)
    .set(Theme_1.Theme.Text.h2Size, 45 * _sr)
    .set(Theme_1.Theme.Text.h3Size, 35 * _sr)
    .set(Theme_1.Theme.Text.h4Size, 30 * _sr)
    .set(Theme_1.Theme.Text.pSize, 40 * _sr)
    .set(Theme_1.Theme.Text.numberUpColor, '#00FF40')
    .set(Theme_1.Theme.Text.numberDownColor, '#FF3B2F')
    .set(Theme_1.Theme.Page.titleColor, '#26C97A')
    .set(Theme_1.Theme.Page.titleSize, '$Text.h1Size')
    .set(Theme_1.Theme.Page.titleIconColor, '$Color.textColor')
    .set(Theme_1.Theme.Chart.redGradiantStart, '#000000')
    .set(Theme_1.Theme.Chart.redGradiantEnd, '#FAFAFA')
    .set(Theme_1.Theme.Input.inputBackground, '#26C97A')
    .set(Theme_1.Theme.Input.inputTextColor, '#FFFFFF')
    .set(Theme_1.Theme.Input.inputTextSize, 50 * _sr)
    .set(Theme_1.Theme.Input.inputLabelSize, 35 * _sr)
    .set(Theme_1.Theme.Input.inputLabelColor, '#D1D1D6')
    .set(Theme_1.Theme.Input.inputLargeLabelSize, 45 * _sr)
    .set(Theme_1.Theme.Input.inputLargeLabelColor, "$Color.textColor")
    .set(Theme_1.Theme.List.listItemPaddingTop, 30 * _sr)
    .set(Theme_1.Theme.List.listItemPaddingButtom, 30 * _sr)
    .set(Theme_1.Theme.Icon.iconColor, '$Color.bkgShade2')
    .set(Theme_1.Theme.Icon.backgroundColor, '#212121')
    .set(Theme_1.Theme.Pin.keyboardBackground, '#111113')
    .set(Theme_1.Theme.Pin.keyboardTextColor, '#FAFAFA')
    .set(Theme_1.Theme.Pin.bubbleActive, '#FFFFFF')
    .set(Theme_1.Theme.Pin.bubbleInActive, '#26C97A')
    .set(Theme_1.Theme.Icon.iconBorderRadius, 5 * _sr);
exports.ThemeContext = react_1.createContext(new types_1.ThemeConstantProvider('unifyre', exports.defaultGreenThemeConstantsBuilder.build()));
//# sourceMappingURL=ThemeContext.js.map