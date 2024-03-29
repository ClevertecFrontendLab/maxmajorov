export const navigateAfterRequest = async (
    navigate: any,
    request: any,
    routes: string[],
    route: string,
) => {
    try {
        if (routes.includes(route)) {
            await request()?.unwrap();
        }

        navigate(route);
    } catch (e) {
        console.log(e);
    }
};
