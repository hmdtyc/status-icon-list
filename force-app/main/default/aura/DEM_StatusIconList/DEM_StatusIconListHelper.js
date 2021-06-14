({
    groupItem: function(c, numStr) {
        const itemName = c.get(`v.item${numStr}Name`);
        const itemIcon = c.get(`v.item${numStr}Icon`);
        const itemStatusField = c.get(`v.item${numStr}StatusField`);
        if (!!itemName && !!itemIcon & !!itemStatusField) {
            return {
                name: itemName,
                icon: itemIcon.indexOf('$Resource.') == 0 ? $A.get(itemIcon) : itemIcon,
                iconType: itemIcon.indexOf('$Resource.') == 0 ? 'static' : 'slds',
                statusField: itemStatusField,
            };
        } else {
            return undefined;
        }
    },
    showUpdatedItems: function(c) {
        const record = c.get('v.record');
        let items = c.get('v.items').map(function(item){
            item.disabled = !record[item.statusField];
            return item; 
        });
        console.log(items);
        c.set('v.items', items);
        c.set('v.itemsLoaded', true);
    },
    showError: function(c, message) {
        const isOnAppBuilder = document.location.href.toLowerCase().indexOf('flexipageeditor') >= 0;
        if (isOnAppBuilder) {
            console.error(message);
            c.set('v.errorMessage', message);
        } else {
            const toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                type: 'error',
                mode : 'sticky',
                message: '[DEM_StatusIconList]: ' + message,
            });
            toastEvent.fire();
        }
    }
})
