import axios from "axios";

const channelsApi = {
    async getChannels() {
        const { data } = await axios({
            method: "get",
            url: "/bc-api/v3/channels",
        });
        return data;
    },
    // setChannels() {
    //     return axios({
    //         method: "post",
    //         url: "/bc-api/v3/channels",
    //     });
    // },
};

export default channelsApi;
