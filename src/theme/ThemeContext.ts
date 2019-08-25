import {createContext} from "react";

export interface Theme {

}

export const ThemeContext = createContext<Theme>({} as Theme);
