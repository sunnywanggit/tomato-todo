Component({
    properties: {
        visible: {
            "type": Boolean,
            "value": true
        },
        placeholder: {
            "type": String,
            "value": ''
        },
        value:{
            type:String,
            value:''
        },
        autoFocus:{
            type:Boolean,
            value:false
        }
    },
    data: {
        inputValue: ''
    },
    methods: {
        confirm: function () {
            this.triggerEvent('confirm', this.data.inputValue)
            this.setData({inputValue:this.properties.value})
        },
        cancel: function () {
            this.triggerEvent('cancel')
        },
        changeValue(event) {
            this.data.inputValue = event.detail.value;
        }

    }

})