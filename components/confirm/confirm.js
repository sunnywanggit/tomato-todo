Component({
    properties: {
        visible: {
            "type": Boolean,
            "value": false
        },
        placeholder: {
            "type": String,
            "value": ''
        }
    },
    data: {
        inputValue: ''
    },
    methods: {
        confirm: function () {
            this.triggerEvent('confirm', this.data.inputValue)
        },
        cancel: function () {
            this.triggerEvent('cancel')
        },
        changeValue(event) {
            this.data.inputValue = event.detail.value;
        }

    }

})