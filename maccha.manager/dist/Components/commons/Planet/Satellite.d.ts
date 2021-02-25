import * as React from "react";
interface Props {
    index: number;
    angle: number;
    open: boolean;
    satelliteCount: number;
    children?: React.ReactNode;
    planetWidth: number;
    planetHeight: number;
    mass: number;
    tension: number;
    friction: number;
    orbitRadius: number;
    rotation: number;
    dragable: boolean;
    dragRadius?: number;
    orientation?: "DEFAULT" | "INSIDE" | "OUTSIDE" | "READABLE";
}
export declare function Satellite(props: Props): JSX.Element;
export {};
