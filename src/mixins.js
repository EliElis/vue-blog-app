const mixins = {
    relatedItemsId(obj) {
        return obj.map((item) => {
            return item.id;
        });
    },

    getItemsByIDs(idsArr, obj) {
        let newObj = [];
        if (idsArr.length > 0) {
            idsArr.forEach((id) => {
                let item = obj.find(el => el.id === id);
                newObj.push(item);
            })
        }
        return newObj;
    }
}

export default mixins;