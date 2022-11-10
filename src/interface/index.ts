import {CarModel, CarInterior, CarEngine, CarColor, CarWheelSizes} from "./carOptions";

export interface specificationsI {
    id: number
    name: string
    engine: CarEngine | string;
    color: CarColor | string;
    interiorMaterial?: CarInterior | string;
    wheelSize?: CarWheelSizes | string;
    wheelModel?: CarModel | string;
    airSuspension?: boolean
    signature?: string
    year?: string
}
