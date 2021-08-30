import axios from 'axios';

const api = {
    getContentType(url, cb) {
        axios.get(url, {}).then(
            (response) => {
                cb(response);
            },
            (error) => {
                console.log(error);
            }
        );
    },

    addContent(url, item, cb) {
        axios.post(url, item).then(
            (response) => {
                if (cb) {
                    cb(response);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    },

    async deleteContent(url, id, cb) {
        await axios
            .delete(`${url}/${id}`, {}).then(
                (response) => {
                    if (cb) {
                        cb(response.data)
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    },

    updateContent(url, item, cb) {
        axios
            .put(`${url}/${item.id}`, item)
            .then(
                (response) => {
                    cb(response)
                },
                (error) => {
                    console.log(error);
                }
            );
    },

}
export default api;