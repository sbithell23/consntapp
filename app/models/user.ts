export class User {
    name?: string;
    email?: string;
    password?: string;
    userId?: any;
    isRegistered?: boolean;
    isLoggedIn?: boolean;
    isKeySetups?: boolean;
    registeredDate?: any;
    updatedDate?: any;
    localImages?: any;
    localAudios?: any;
    localVideos?: any;
    appVersion?: any;
    appBuild?: any;
    allRecords?: IRecord[];

    constructor(fields: any) {
        for (let f in fields) {
            this[f] = fields[f];
        }
    }

}