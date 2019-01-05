import {
    TASK_CREATE,
    TASK_REMOVE,
    TASK_UPDATE,
    TASK_END_EDIT,
    TASK_START_EDIT
} from './taskActionTypes';

const initialState = [
    {
        id: '1',
        title: 'test',
        text: undefined,
        tags: []
    },
    {
        id: '2',
        title: 'test554',
        text: undefined,
        tags: []
    },
    {
        id: '3',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        id: '4',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        id: '5',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        id: '6',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        id: '7',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        id: '8',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    },
    {
        id: '9',
        title: 'biggus Dickus',
        text: undefined,
        tags: []
    }
];

export default (state = initialState, action) => {
    let { type, payload } = action;
    console.log('action triggered');
    switch (type) {
        case TASK_UPDATE:
            let updateIndex = getTaskById(payload.task.id, state);

            return [
                ...state.slice(0, updateIndex),
                Object.assign({}, payload.task),
                ...state.slice(updateIndex + 1)
            ];

        case TASK_CREATE:
            return [Object.assign({}, payload.task), ...state];

        case TASK_REMOVE:
            return [...state.filter(task => task.id !== payload.task.id)];

        case TASK_START_EDIT:
            let startEditIndex = getTaskById(payload.id, state);

            return [
                ...state.slice(0, startEditIndex),
                Object.assign({}, state[startEditIndex], { editing: true }),
                ...state.slice(startEditIndex + 1)
            ];
        case TASK_END_EDIT:
            let endEditIndex = getTaskById(payload.id, state);

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
    return state.findIndex(item => item.id === id);
};
