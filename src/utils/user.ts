import * as ip from "./ip";
import * as memo from "../core/memo";
import $ from "cash-dom";
import type {Nullable, ObjectEnum} from "./types";

export type UserType =
    | "UNFIXED"
    | "HALF_FIXED"
    | "FIXED"
    | "HALF_FIXED_SUB_MANAGER"
    | "FIXED_SUB_MANAGER"
    | "HALF_FIXED_MANAGER"
    | "FIXED_MANAGER";

const USERTYPE: ObjectEnum<UserType> = {
    UNFIXED: "UNFIXED",
    HALF_FIXED: "HALF_FIXED",
    FIXED: "FIXED",
    HALF_FIXED_SUB_MANAGER: "HALF_FIXED_SUB_MANAGER",
    FIXED_SUB_MANAGER: "FIXED_SUB_MANAGER",
    HALF_FIXED_MANAGER: "HALF_FIXED_MANAGER",
    FIXED_MANAGER: "FIXED_MANAGER"
};

export const getType = (icon: string | null): UserType => {
    if (icon === null) {
        return USERTYPE.UNFIXED;
    } else if (icon.endsWith("fix_managernik.gif")) {
        return USERTYPE.FIXED_MANAGER;
    } else if (icon.endsWith("fix_sub_managernik.gif")) {
        return USERTYPE.FIXED_SUB_MANAGER;
    } else if (icon.endsWith("sub_managernik.gif")) {
        return USERTYPE.HALF_FIXED_SUB_MANAGER;
    } else if (icon.endsWith("managernik.gif")) {
        return USERTYPE.HALF_FIXED_MANAGER;
    } else if (
        icon.endsWith("fix_nik.gif") ||
        icon.endsWith("nftcon_fix.png") ||
        icon.endsWith("dc20th_wgallcon4.png") ||
        icon.endsWith("w_app_gonick_16.png") ||
        icon.endsWith("nftmdcon_fix.png") ||
        icon.endsWith("gnftmdcon_fix.gif") ||
        icon.endsWith("bestcon_fix.png")
    ) {
        return USERTYPE.FIXED;
    } else if (
        icon.endsWith("nik.gif") ||
        icon.endsWith("nftcon.png") ||
        icon.endsWith("dc20th_wgallcon.png") ||
        icon.endsWith("w_app_nogonick_16.png") ||
        icon.endsWith("nftmdcon.png") ||
        icon.endsWith("gnftmdcon.gif") ||
        icon.endsWith("bestcon.png")
    ) {
        return USERTYPE.HALF_FIXED;
    } else {
        return USERTYPE.UNFIXED;
    }
};

export class User {
    ip_data: Nullable<string>;
    ip_color: Nullable<string>;
    type: UserType;
    memo: Nullable<RefresherMemoValue>;
    private __ip: Nullable<string>;

    constructor(
        public nick: string,
        public id: Nullable<string>,
        ip: Nullable<string>,
        public icon: Nullable<string>
    ) {
        this.__ip = null;
        this.ip_data = null;
        this.ip_color = null;

        this.nick = nick;
        this.id = id;
        this.ip = ip;

        this.icon = icon;
        this.type = getType(this.icon);
        this.memo = null;

        this.getMemo();
    }

    get ip(): string | null {
        return this.__ip;
    }

    set ip(v: string | null) {
        this.__ip = v;

        if (v === null) return;

        const ispData = ip.ISPData(v);
        this.ip_color = ispData.color;
        this.ip_data = ip.format(ispData);
    }

    static fromDom(dom: HTMLElement | null): User {
        const user = new User("", null, null, null);
        const $dom = $(dom);

        if (!dom || !$dom.length) return user;

        user.nick = dom.dataset.nick || "오류";
        user.id = dom.dataset.uid || null;

        const ip = dom.dataset.ip;
        user.ip = ip ? String(ip) : null;

        user.icon = user.id
            ? $dom.find("a.writer_nikcon img").attr("src")
            : null;
        user.type = getType(user.icon);

        user.getMemo();

        return user;
    }

    getMemo(): void {
        this.memo = memo.get("UID", this.id) ?? memo.get("IP", this.ip) ?? memo.get("NICK", this.nick);
    }

    isLogout(): boolean {
        return this.ip !== null;
    }

    isMember(): boolean {
        return this.id !== null;
    }
}
