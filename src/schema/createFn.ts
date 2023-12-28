import { createBasicEntity } from "./businessTable/basicEntity";
import { createDetailEntity } from "./businessTable/detailEntity";
import { createMainEntity } from "./businessTable/mainEntity";
import { createButton } from "./button";
import { createForm } from "./form";
import { createInput } from "./input";
import { createMenu } from "./menu";
import { createTab } from "./tab";
import { createTable } from "./table";

const createFn = {
    createDetailEntity: createDetailEntity,
    createMainEntity: createMainEntity,
    createButton,
    createInput,
    createTable,
    createMenu,
    createTab,
    createForm,
}

export { createFn }