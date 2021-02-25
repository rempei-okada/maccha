/// <reference types="react" />
import { CreateCSSProperties, CSSProperties } from "@material-ui/styles";
interface Props {
    orbitStyle?: (defaultStyle: CSSProperties | CreateCSSProperties<{}>) => CSSProperties | CreateCSSProperties<{}>;
    orbitRadius: number;
    planetWidth: number;
    planetHeight: number;
    open: boolean;
    mass: number;
    tension: number;
    friction: number;
    elevation: number;
    color: string;
}
export declare function Orbit(props: Props): JSX.Element;
export {};
