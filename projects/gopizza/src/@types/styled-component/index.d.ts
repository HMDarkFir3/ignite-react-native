import "styled-components";
import { light } from "@themes/index";

declare module "styled-components" {
  type ThemeType = typeof light;

  export interface DefaultTheme extends ThemeType {}
}
