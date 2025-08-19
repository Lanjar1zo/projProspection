import Model from "@/Hook/Model";
import { ComponentInternalInstance } from "vue";

export class Partie_Plante extends Model {
    constructor(appInstance: ComponentInternalInstance|null) {
        super(appInstance, "Partie_Plante");
    }
}