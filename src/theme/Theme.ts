const _BUTTON = 'Button.'
const _COLOR = 'Color.'
const _SPACES = 'Spaces.'
const _FONT = 'Font.'
const _TEXT = 'Text.'
const _PAGE = 'Page.'
const _CHART = 'Chart.'
const _INPUT = 'Input.'
const _LIST = 'List.'
const _ICON = 'Icon.'
const _SWITCH = 'Switch.'
const _PIN = 'Pin.'
const _COIN = 'Coin.'

export class Theme {
    static Spaces = {
        screenMarginHorizontal: _SPACES + 'screenMarginHorizontal',
        screenMarginVertical: _SPACES + 'screenMarginVertical',
        gap: _SPACES + 'gap',
        line: _SPACES + 'line',
    }
    static Colors = {
        bkgShade0: _COLOR + 'bkgShade0',
        bkgShade1: _COLOR + 'bkgShade1',
        bkgShade2: _COLOR + 'bkgShade2',
        bkgShade3: _COLOR + 'bkgShade3',
        bkgShade4: _COLOR + 'bkgShade4',
        textColor: _COLOR + 'textColor',
        highlight: _COLOR + 'highlight',
        splash: _COLOR + 'splash',
        headerTextColor: _COLOR + 'headerTextColor',
        themeNavBkg: _COLOR + 'themeNavBkg',
    }
    static Button = {
        btnPrimary: _BUTTON + 'btnPrimary',
        inverseBtnPrimary: _BUTTON + 'inverseBtnPrimary',
        btnHighlight: _BUTTON + 'btnHighlight',
        btnPrimaryTextColor: _BUTTON + 'btnPrimaryTextColor',
        inverseBtnPrimaryTextColor: _BUTTON + 'inverseBtnPrimaryTextColor',
        btnHighlightTextColor: _BUTTON + 'btnHighlightTextColor',
        btnBorderRadius: _BUTTON + 'btnBorderRadius',
        btnPadding: _BUTTON + 'btnPadding',
    }
    static Font = {
        main: _FONT + 'main',
    }
    static Text = {
        textColor: _TEXT + 'textColor',
        inversTextColor: _TEXT + 'inversTextColor',
        subTextColor: _TEXT + 'subTextColor',
        disabledColor: _TEXT + 'disabledColor',
        linkColor: _TEXT + 'linkColor',
        infoColor: _TEXT + 'infoColor',
        h1Size: _TEXT + 'h1Size',
        h2Size: _TEXT + 'h2Size',
        h3Size: _TEXT + 'h3Size',
        h4Size: _TEXT + 'h4Size',
        pSize: _TEXT + 'pSize',
        numberDownColor: _TEXT + 'numberDown',
        numberUpColor: _TEXT + 'numberUp',
    }
    static Page = {
        titleColor: _PAGE + 'titleColor',
        titleSize: _PAGE + 'titleSize',
        titleIconColor: _PAGE + 'titleIconColor',
    }
    static Chart = {
        redGradiantStart: _CHART + 'redGradiantStart',
        redGradiantEnd: _CHART + 'redGradiantEnd',
        greenGradiantStart: _CHART + 'greenGradiantStart',
        greenGradiantEnd: _CHART + 'greenGradiantStart',
    }
    static Input = {
        inputBackground: _INPUT + 'inputBackground',
        inputTextColor: _INPUT + 'inputTextColor',
        inputTextSize: _INPUT + 'inputTextSize',
        inputLabelColor: _INPUT + 'inputLabelColor',
        inputLabelSize: _INPUT + 'inputLabelSize',
        inputLargeLabelSize: _INPUT + 'inputLargeLabelSize',
        inputLargeLabelColor: _INPUT + 'inputLargeLabelColor',
    }
    static List = {
        listItemPaddingTop: _LIST + 'listItemPaddingTop',
        listItemPaddingButtom: _LIST + 'listItemPaddingButtom',
        listItemBorderColor: _LIST + 'listItemBorderColor',
    }
    static Icon = {
        backgroundColor: _ICON + 'backgroundColor',
        iconColor: _ICON + 'iconColor',
        iconBorderRadius: _ICON + 'iconBorderRadius',
    }
    static Switch = {
        thumbColor: _SWITCH + 'thumbColor',
        backgroundColorFalse: _SWITCH + 'backgroundColorFalse',
        backgroundColorTrue: _SWITCH + 'backgroundColorTrue',
    }
    static Pin = {
        keyboardBackground: _PIN + 'keyboardBackground',
        keyboardTextColor: _PIN + 'keyboardTextColor',
        bubbleActive: _PIN + 'bubbleActive',
        bubbleInActive: _PIN + 'bubbleInActive',
    }
    static Coin = {
        iconBackground: _COIN + 'iconBackground',
    }
    static Logo = {
        logo: 'Logo.mainLogo',
        logoHeight: 'Logo.mainLogoHeight',
    }
}
