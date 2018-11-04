import { Group, Groups, GroupAction } from "../models/group";
import { get, put, post, getStoredUsername, storeUsername } from "./api";
import { Bridge } from '../models/bridge';
import { AddUserRequest, AddUserResponse, errorTypes as userErrors } from "../models/user";

const appIdentifier = "hue_helper_react_native#app"; 
const hueDiscoveryUrl = "https://discovery.meethue.com/";

class HueApi {
    private username: string | null = null;
    private rootUrl = "";
    private bridgeId = "";
    
    get apiRootUrl() { return `${this.rootUrl}/api`; }
    get apiUrl() { return `${this.apiRootUrl}/${this.username}`; }
    get groupUrl() { return `${this.apiUrl}/groups`; }

    public async getGroups(): Promise<Groups> {
        return await get<Groups>(this.groupUrl);
    }

    public async getGroup(groupId: string): Promise<Group> {
        return await get<Group>(`${this.groupUrl}/${groupId}`);
    }

    public async setGroupAction(groupId: string, action: GroupAction): Promise<boolean> {
        try {
            await put(`${this.groupUrl}/${groupId}/action`, action);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public async createUser(): Promise<true | string> {
        const req: AddUserRequest = { devicetype: appIdentifier };
        const res = await post<AddUserResponse[]>(this.apiRootUrl, req);
        if (!res || !res.length) {
            console.error("bad problem");
            return "sanity check failed";
        }
        const response = res[0];
        if (response.error) {
            if (response.error.type === userErrors.linkButtonNotPressed) {
                return "Link button not pressed";
            } else {
                return response.error.description;
            }
        } else if (response.success) {
            const { username } = response.success;
            await storeUsername(this.bridgeId, username);
            this.username = username;
            console.log(`user created: ${username}`);
            return true;
        } else {
            console.error("something very wrong");
            debugger;
            return "sanity check failed";
        }
    }

    public async discover(): Promise<boolean> {
        try {
            const bridges = await get<Bridge[]>(hueDiscoveryUrl);
            if (!bridges || !bridges.length) {
                return false;
            }
            this.rootUrl = `http://${bridges[0].internalipaddress}`;
            this.bridgeId = bridges[0].id;
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public async getStoredUsername(): Promise<boolean> {
        if (this.bridgeId == null) return false;
        this.username = await getStoredUsername(this.bridgeId);
        return this.username != null;
    }
}

export default new HueApi();