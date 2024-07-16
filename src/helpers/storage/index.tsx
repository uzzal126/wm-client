const getLocal = (name: string) => {
    if (typeof window !== "undefined") {
        if (localStorage === undefined || !localStorage) {
            return;
        }

        const lsValue = localStorage.getItem(name);
        if (!lsValue) {
            return;
        }
        try {
            const auth = JSON.parse(lsValue);
            if (auth) {
                return auth;
            }
        } catch (error) {
            console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
        }
    }
};

const setLocal = (name: string, auth: any) => {
    if (!localStorage) {
        return;
    }

    try {
        const lsValue = JSON.stringify(auth);
        localStorage.setItem(name, lsValue);
    } catch (error) {
        console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
    }
};

const removeLocal = (name: string) => {
    if (!localStorage) {
        return;
    }

    try {
        localStorage.removeItem(name);
    } catch (error) {
        console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
    }
};

export { getLocal, removeLocal, setLocal };
