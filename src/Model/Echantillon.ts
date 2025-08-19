import Model from "@/Hook/Model";
import { ComponentInternalInstance } from "vue";

export class Echantillon extends Model {
    constructor(appInstance: ComponentInternalInstance|null) {
        super(appInstance, "Echantillon");
    }
}