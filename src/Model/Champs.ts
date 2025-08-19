import Model from "@/Hook/Model";
import { ComponentInternalInstance } from "vue";

export class Champs extends Model {
    constructor(appInstance: ComponentInternalInstance|null) {
        super(appInstance, "Champs");
    }
}