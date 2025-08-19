import Model from "@/Hook/Model";
import { ComponentInternalInstance } from "vue";

export class Prospection extends Model {
    constructor(appInstance: ComponentInternalInstance|null) {
        super(appInstance, "Prospection");
    }
}