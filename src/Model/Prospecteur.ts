import Model from "@/Hook/Model";
import { ComponentInternalInstance } from "vue";

export class Prospecteur extends Model {
    constructor(appInstance: ComponentInternalInstance|null) {
        super(appInstance, "Prospecteur");
    }
}