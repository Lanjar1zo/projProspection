import Model from "@/Hook/Model";
import { ComponentInternalInstance } from "vue";

export class Producteur extends Model {
    constructor(appInstance: ComponentInternalInstance|null) {
        super(appInstance, "Producteur");
    }
}