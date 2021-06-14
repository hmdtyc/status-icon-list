({
    init : function(c, e, h) {
        let titleIcon = c.get('v.titleIcon');
        if (!!titleIcon && titleIcon.indexOf('$Resource.') == 0) {
            c.set('v.isTitleIconTypeSLDS', false);
            c.set('v.titleIcon', $A.get(titleIcon));
        }
        let items = [];
        let fields = [];
        for(let i = 1; i<=12; i++){
            let numStr = i.toString().padStart(2, 0);
            let item = h.groupItem(c, numStr);
            if (item) {
                items.push(item);
                fields.push(item.statusField);
            }
        }
        c.set('v.items', items);
        c.set('v.fields', fields);
    },
    recordUpdated: function(c, e, h) {
        const changeType = e.getParams().changeType;
        if (changeType === 'ERROR') {
            /* handle error; do this first! */
            console.log('ERROR!!');
            h.showError(c, c.get('v.error'));
        } else if (changeType === 'LOADED') {
            /* handle record load */
            console.log('LOADED!!');
            h.showUpdatedItems(c);
        } else if (changeType === 'REMOVED') {
            /* handle record removal */
        } else if (changeType === 'CHANGED') {
            /* handle record change */
            console.log('CHANGED!!');
            h.showUpdatedItems(c);
        }
    }
})
