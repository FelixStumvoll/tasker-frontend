import {
    TASK_CREATE,
    TASK_REMOVE,
    TASK_UPDATE,
    TASK_END_EDIT,
    TASK_START_EDIT
} from './taskActionTypes';

const initialState = [
    {
        _id: '1',
        title: 'test',
        text: undefined,
        tags: []
    },
    {
        _id: '2',
        title: 'test554',
        text: undefined,
        tags: []
    },
    {
        _id: '3',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        _id: '4',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        _id: '5',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        _id: '6',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        _id: '7',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        _id: '8',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        _id: '9',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    }
];

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case TASK_UPDATE:
            let updateIndex = getTaskById(payload.task._id, state);

            return [
                ...state.slice(0, updateIndex),
                Object.assign({}, payload.task),
                ...state.slice(updateIndex + 1)
            ];

        case TASK_CREATE:
            return [Object.assign({}, payload.task), ...state];

        case TASK_REMOVE:
            return [...state.filter(task => task._id !== payload.task._id)];

        case TASK_START_EDIT:
            let startEditIndex = getTaskById(payload._id, state);

            return [
                ...state.slice(0, startEditIndex),
                Object.assign({}, state[startEditIndex], { editing: true }),
                ...state.slice(startEditIndex + 1)
            ];
        case TASK_END_EDIT:
            let endEditIndex = getTaskById(payload._id, state);

            return [
                ...state.slice(0, endEditIndex),
                Object.assign({}, state[endEditIndex], { editing: false }),
                ...state.slice(endEditIndex + 1)
            ];
        default:
            return state;
    }
};

const getTaskById = (id, state) => {
    return state.findIndex(item => item._id === id);
};
