export default {
    type: {
        required: true,
        type: String,
    },
    collection: {
        required: true,
        type: String,
    },
    uploadUrl: {
        required: true,
        type: String,
    },
    model: {
        required: true,
        type: Object,
    },
    data: {
        default: () => ({}),
        type: Object,
    },
    debug: {
        default: false,
        type: Boolean,
    },
};