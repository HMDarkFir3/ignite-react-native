//styled-components
import "styled-components";

//Global
import light from "../../global/styles/light";

declare module "styled-components" {
  type ThemeType = typeof light;

  export interface DefaultTheme extends ThemeType {}
}
