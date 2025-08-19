import Model from "@/Hook/Model";
import { ComponentInternalInstance } from "vue";

export class Symptome extends Model {
    constructor(appInstance: ComponentInternalInstance|null) {
        super(appInstance, "Symptome");
    }
}