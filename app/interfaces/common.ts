
interface confirmAlerts {
    header?: string;
    message: string,
    confirmBtnText?: string,
    cancelBtnText?: string,
}

interface toastOptions {
    message: string,
    duration?: number,     //milliseconds
    position?: any     //top,bottom,center
}

interface IToastOption {
    message?: string,
    duration?: any,
    position?: any,
    showCloseButton?: boolean,
    closeButtonText?: string,
    cssClass?: string,
}

interface Scripts {
    name: string;
    src: string;
    type: string;
}

interface IUser {
    name?: string;
    email?: string;
    password?: string;
    userId?: any;
    isRegistered?: boolean;
    isLoggedIn?: boolean;
    isKeySetups?: boolean;
    registeredDate?: any;
    updatedDate?: any,
    localImages?: any;
    localAudios?: any;
    localVideos?: any;
    appVersion?: any;
    appBuild?: any;
    allRecords?: IRecord[];
}

interface IRecord {
    name?: string;
    purpose?: string;
    dateAdded?: string;
    expiryDate?: string;
    images?: IMediaType[];
    audios?: IMediaType[];
    videos?: IMediaType[];
}

interface IMediaType {
    type?: string,
    url?: string,
    base64String?: string;
}

interface IgetFile {
    fileName?: string;
    base64String?: string;
    nativeUrl?: string;
    localURL?: string;
}

interface ISheetOptions {
    title?: string;
    translateButtons?: boolean;
    showCancelButton?: boolean;
    buttons: {
        text: string;
        returnText: string;
        role?: string;
        icon?: string;
        cssClass?: string;
        handler?: () => boolean | void;
    }[];
}

interface IConstants {
    API_ERROR_TEXT?: string;
}