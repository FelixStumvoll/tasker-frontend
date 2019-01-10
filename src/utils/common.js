import { format } from 'date-fns';

export const dateSortFunction = (lhs, rhs) => {
    if (!lhs.dueDate) {
        return 1;
    }

    if (!rhs.dueDate) {
        return -1;
    }

    return new Date(lhs.dueDate) - new Date(rhs.dueDate);
};

export const searchFilterFunction = (task, searchTerm) => {
    if (task.title && task.title.includes(searchTerm)) return true;

    if (task.text && JSON.stringify(task.text).includes(searchTerm))
        return true;

    let tagEx = new RegExp(`.*${searchTerm}.*`); //tagularExpression
    if (
        task.tags.find(tag => {
            return tagEx.test(tag);
        })
    ) {
        return true;
    }

    if (task.dueDate && format(task.dueDate, 'dd.MM.yyyy').includes(searchTerm))
        return true;

    return false;
};
