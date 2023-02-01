// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    secondaryTextColor: string;
    accentColor: string;
    cardBgColor: string;
    boardColor: string;
    cardColor: string;
    buttonColor: string;
    hoverButtonColor: string;
    hoverButtonOverlayColor: string;
  }
}
