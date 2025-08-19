import Model from "@/Hook/Model";
import { ComponentInternalInstance } from "vue";

export class Login extends Model {
    constructor(appInstance: ComponentInternalInstance|null) {
        super(appInstance, "Login");
    }
}